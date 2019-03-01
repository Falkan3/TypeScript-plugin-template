/*
 * Environment
 */

export const Environment = {
    production: false,
    ver: '001',
    // Custom parameters for individual environments (clients)

    // parameters required to be present in the query. (* - any value)
    requiredExternalParams: {
        // Only one condition met is sufficient
        'or': [
            {'from': '*', 'utm_source': '*', 'gclid': '*'},
            {'utm_medium': 'TestSource'}
        ],
        // All conditions have to be met
        'and': [
            {'test': 'test'}
        ]
    },

    // API URLs and keys
    api: {
        // params
        clientId: '', // client ID.
        vid: '', // visit ID.

        // URLs
        urls: {
            base: "https://yoursite.com",  // input data API domain

            // helper urls
            toDoList: 'https://jsonplaceholder.typicode.com/todos/1', // URL to the API returning the number of visits for the current visitor (by IP or fingerprint)
        },
        config: {
            mainDomain: 'test.com', // monitored page main domain (for setting universal cookies)

            // ajax config
            ajax: {
                active: false, // is the form sent via ajax
                timeout: 3000
            },
            // websocket config
            ws: {
                active: true, // is the websocket functionality active
                timeout: false // interrupt connection after x ms, there is also server side enforced time limit
            }
        },
        data: {

        }
    },
};