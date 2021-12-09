import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import {
	URL_BASE,
	DatasetInfo,
	FeatureViewInfo,
	FeatureViewCreate
} from './pages';
import * as Layout from './Layout';
import { Button, Icon, List, Modal, Tab } from 'semantic-ui-react';

// TODO:
// add search on sidebars

async function getDatasets() {
    const resp = await axios.get(
        `${URL_BASE}/datasets`
    );
    return resp.data;
}

const DatasetList = ({ datasets }) => {
    return(
		<List selection divided>
			{datasets.map(datasetName => (
				<List.Item key={datasetName}>
					<NavLink
						to={`/datasets/${datasetName}`}
						style={isActive => ({
							color: isActive ? 'black' : 'grey',
							fontWeight: isActive ? 'bold' : 'normal'
						})}
					>
						{datasetName}
					</NavLink>
				</List.Item>
			))}
		</List>
    );
}

async function getFeatureViews() {
    const resp = await axios.get(
        `${URL_BASE}/feature-views`
    );
    return resp.data;
}

const FeatureViewList = ({ featureViews, reload }) => {
	const [deleteMode, setDeleteMode] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const deleteFeatureView = (featureViewName) => {
        axios.delete(`${URL_BASE}/feature-views/${featureViewName}`)
        .then((response) => {
            if (response.status === 204) {
                setSubmitted(true);
            }
        })
        .catch((error) => { console.log(error); });
    };

    return(<>
		<List selection divided>
			{featureViews.map(featureViewName => (
				<List.Item key={featureViewName}>
					<NavLink
						to={`/feature-views/info/${featureViewName}`}
						style={isActive => ({
							color: isActive ? 'black' : 'grey',
							fontWeight: isActive ? 'bold' : 'normal'
						})}
					>
						{featureViewName}
					</NavLink>
					{deleteMode && <Button
						floated='right' color='red' icon='minus'
						onClick={() => deleteFeatureView(featureViewName)}
					/>}
				</List.Item>
			))}
		</List>
		{deleteMode || <NavLink to='/feature-views/create'>
			<Button icon inverted color='green'>
				<Icon name='plus circle' />
				New..
			</Button>
		</NavLink>}
		{deleteMode ? <Button icon color='grey'
			onClick={() => setDeleteMode(false)}
		>
			<Icon name='chevron circle left' />
			Cancel..
		</Button> : <Button icon color='red' inverted
			onClick={() => setDeleteMode(true)}
		>
			<Icon name='minus circle' />
			Delete..
		</Button>}
		<Modal
			centered={false}
			open={submitted}
			onClose={() => {
				setSubmitted(false);
				reload();
			}}
			closeOnDimmerClick={false}
			header='Success!'
			content='The feature view is successfully deleted.'
			actions={[{ key: 'confirm', content: 'Confirm', positive: true }]}
		/>
	</>);
}

const App = () => {
	const {
		data: datasets,
		datasetsError,
		datasetsLoading
	} = useAsync({ promiseFn: getDatasets });
	const {
		data: featureViews,
		featureViewsError,
		featureViewsLoading,
		reload: featureViewsReload
	} = useAsync({ promiseFn: getFeatureViews });
	const panes = [{
		menuItem: 'Datasets',
		render: () =>
		<Tab.Pane loading={datasetsLoading}>
			{datasetsError && <>Datasets Error</>}
			{datasets && <DatasetList datasets={datasets}/>}
		</Tab.Pane>
	}, {
		menuItem: 'Feature Views',
		render: () =>
		<Tab.Pane loading={featureViewsLoading}>
			{featureViewsError && <>Feature Views Error</>}
			{featureViews && <FeatureViewList featureViews={featureViews} reload={featureViewsReload}/>}
		</Tab.Pane>
	}];

	return (
		<Router>
			<Layout.Header>
				<div>
					<h1>EDA for Feature Store</h1>
					2021 Fall CID Project
				</div>
			</Layout.Header>

			<Layout.Body>
				<Layout.SideBar>
					<Tab menu={{ secondary: true, pointing: true }} panes={panes} />
				</Layout.SideBar>
				<Layout.Main>
					<Route
						path={`/datasets/:dataset_name`}
						render={(props) =>
							<DatasetInfo {...props} key={props.match.url} />
						}
					/>
					<Route
						path={`/feature-views/info/:feature_view_name`}
						render={(props) =>
							<FeatureViewInfo {...props} key={props.match.url} />
						}
					/>
					<Route
						path={`/feature-views/create`}
						render={(props) =>
							<FeatureViewCreate {...props} reload={featureViewsReload} />
						}
					/>
				</Layout.Main>
			</Layout.Body>
		</Router>
	);
}

export default App;
