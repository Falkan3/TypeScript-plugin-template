"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = {
    production: false,
    ver: '001',
    requiredExternalParams: {
        'or': [
            { 'from': '*', 'utm_source': '*', 'gclid': '*' },
            { 'utm_medium': 'TestSource' }
        ],
        'and': [
            { 'test': 'test' }
        ]
    },
    api: {
        clientId: '',
        vid: '',
        urls: {
            base: "https://yoursite.com",
            toDoList: 'https://jsonplaceholder.typicode.com/todos/1',
        },
        config: {
            mainDomain: 'test.com',
            ajax: {
                active: false,
                timeout: 3000
            },
            ws: {
                active: true,
                timeout: false
            }
        },
        data: {}
    },
};
//# sourceMappingURL=environment.example.js.map