import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { URL_BASE } from '.';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { Table, Input, Dropdown, Button, Modal } from 'semantic-ui-react';

// TODO:
// show data type of currently selected columns

const DatasetNameDropdown = ({ index, control, setValue, options }) => {
    const name = `features[${index}].dataset_name`;
    return(
        <Controller
            name={name}
            control={control}
            render={({ field }) => <Dropdown {...field}
                search
                selection
                placeholder='Dataset name'
                options={options}
                onChange={(event, { value }) => setValue(name, value)}
            />}
        />
    );
};

const ColumnNameDropdown = ({ index, control, setValue }) => {
    const name = `features[${index}].column_name`
    const watch = useWatch({
        name: `features[${index}].dataset_name`,
        control
    });
    
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);
    useEffect(() => {
        async function getColumns() {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${URL_BASE}/datasets/${watch}`
                );
                const columnNameOptions = response.data.columns.map((column) => { return {
                    key: column.name,
                    text: column.name,
                    value: column.name
                }})
                setOptions(columnNameOptions);
            } catch (e) {
                setLoading(false);
                console.log(e);
                return <>Failed to load datasets!</>;
            }
            setLoading(false);
        }
        getColumns();
    }, [watch]);

    return(
        <Controller
            name={name}
            control={control}
            render={({ field }) => <Dropdown {...field}
                loading={loading}
                search
                selection
                placeholder='Column name'
                options={options}
                onChange={(event, { value }) => setValue(name, value)}
            />}
        />
    );
};

const FeatureTypeDropdown = ({ index, control, setValue }) => {
    const name = `features[${index}].feature_type`;
    const featureTypeOptions = [
        {key: 'qnt', text: 'QUANTITATIVE',  value: 'QUANTITATIVE'},
        {key: 'ord', text: 'ORDINAL',       value: 'ORDINAL'},
        {key: 'ctg', text: 'CATEGORICAL',   value: 'CATEGORICAL'},
        {key: 'cus', text: 'CUSTOM',        value: 'CUSTOM'}
    ];
    return(
        <Controller
            name={name}
            control={control}
            render={({ field }) => <Dropdown {...field}
                search
                selection
                placeholder='Feature type'
                options={featureTypeOptions}
                onChange={(event, { value }) => setValue(name, value)}
            />}
        />
    );
};

function FeatureViewCreate() {
    const [loading, setLoading] = useState(true);
    const [datasets, setDatasets] = useState();
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        async function getDatasets() {
            try {
                const response = await axios.get(
                    `${URL_BASE}/datasets`
                );
                setDatasets(response.data);
            } catch (e) {
                setLoading(false);
                console.log(e);
                return <>Failed to load datasets!</>;
            }
            setLoading(false);
        }
        getDatasets();
    }, []);

    const { control, setValue, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            features: [{
                name: '',
                dataset_name: '',
                column_name: '',
                feature_type: ''
            }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'features'
    });
    const onSubmit = (data) => {
        axios.post(`${URL_BASE}/feature-views`, data)
        .then((response) => {
            if (response.status === 200) {
                setSubmitted(true);
            }
        })
        .catch((error) => { console.log(error); });
    };

    if (loading) return <>Loading...</>;
    return (<>
        <h1>Create a Feature View</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Name</h2>
            <Controller
                name='name'
                control={control}
                render={({ field }) => <Input {...field}
                    placeholder='Feature view name'
                />}
            />
            <h2>Features</h2>
            <Table celled striped definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>Feature</Table.HeaderCell>
                        <Table.HeaderCell>Dataset</Table.HeaderCell>
                        <Table.HeaderCell>Column</Table.HeaderCell>
                        <Table.HeaderCell>Feature Type</Table.HeaderCell>
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {fields.map((field, index) => { return (
                        <Table.Row key={field.id}>
                            <Table.Cell>{index + 1}</Table.Cell>
                            <Table.Cell>
                                <Controller
                                    name={`features[${index}].name`}
                                    control={control}
                                    render={({ field }) => <Input {...field}
                                        placeholder='Feature name'
                                    />}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <DatasetNameDropdown
                                    index={index}
                                    control={control}
                                    setValue={setValue}
                                    options={datasets.map((dataset) => { return {
                                        key: dataset, text: dataset, value: dataset
                                    }})}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <ColumnNameDropdown
                                    index={index}
                                    control={control}
                                    setValue={setValue}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <FeatureTypeDropdown
                                    index={index}
                                    control={control}
                                    setValue={setValue}
                                />
                            </Table.Cell>
                            <Table.Cell textAlign='center'>
                                <Button type='button'
                                    negative
                                    onClick={() => remove(index)}
                                >
                                    Delete
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ); })}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.Cell colSpan='6'>
                            <Button type='button'
                                onClick={() => append({
                                    name: '',
                                    dataset_name: '',
                                    column_name: '',
                                    feature_type: ''
                                })}
                                floated='right'
                            >
                                Add
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Footer>

            </Table>
            <Button type='submit' positive>Submit</Button>
            <Modal
                centered={false}
                open={submitted}
                onClose={() => setSubmitted(false)}
                closeOnDimmerClick={false}
                header='Success!'
                content='Your feature view is successfully created.'
                actions={[{ key: 'confirm', content: 'Confirm', positive: true }]}
            />
        </form>
    </>);
}

export default FeatureViewCreate;
