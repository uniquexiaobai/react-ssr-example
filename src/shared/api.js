import fetch from 'isomorphic-fetch';

export const fetchData = (target = 'echojs') => {
	const url = `https://top-api.lokibai.com?target=${target}`;

	return fetch(url).then(data => data.json());
};
