import React from 'react';
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
import { Button, Icon, List, Tab } from 'semantic-ui-react';

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
							color: isActive ? 'black' : 'gray',
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

const FeatureViewList = ({ featureViews }) => {
    return(
		<List selection divided>
			{featureViews.map(featureViewName => (
				<List.Item key={featureViewName}>
					<NavLink
						to={`/feature-views/info/${featureViewName}`}
						style={isActive => ({
							color: isActive ? 'black' : 'gray',
							fontWeight: isActive ? 'bold' : 'normal'
						})}
					>
						{featureViewName}
					</NavLink>
				</List.Item>
			))}
		</List>
    );
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
		featureViewsLoading
	} = useAsync({ promiseFn: getFeatureViews });
	const panes = [{
		menuItem: 'Datasets',
		render: () => <Tab.Pane loading={datasetsLoading}>
			{datasetsError && <>Datasets Error</>}
			{datasets && <DatasetList datasets={datasets}/>}
		</Tab.Pane>
	}, {
		menuItem: 'Feature Views',
		render: () => <Tab.Pane loading={featureViewsLoading}>
			{featureViewsError && <>Feature Views Error</>}
			{featureViews && <FeatureViewList featureViews={featureViews} />}
			<NavLink to='/feature-views/create'>
				<Button icon inverted color='green'>
					<Icon name='plus circle' />
					New..
				</Button>
				</NavLink>
		</Tab.Pane>
	}];

	return (
		<Router>
			<Layout.Header>
				<div>
					<h1>EDA on Feature Store</h1>
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
						component={FeatureViewCreate}
					/>
				</Layout.Main>
			</Layout.Body>
		</Router>
	);
}

export default App;
