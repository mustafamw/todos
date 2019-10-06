const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const configs = {
    'development': {
        'application': {
            'name': 'todos',
            'domain': 'localhost',
            'port': 3000
        },
        'mongodb': {
            'url': 'mongodb://localhost:27017/todos'
        },
        'swagger': {
            'path': '/api-docs'
        }
    },
    'production': {
        'application': {
            'name': 'todos',
            'domain': 'hushtech.co.uk',
            'port': 3000
        },
        'mongodb': {
            'url': 'mongodb://localhost:27017/todos'
        },
        'swagger': {
            'path': '/api-docs'
        }
    },
    'docker': {
        'application': {
            'name': 'todos',
            'domain': 'localhost',
            'port': 3000
        },
        'mongodb': {
            'url': 'mongodb://mongo:27017/todos'
        },
        'swagger': {
            'path': '/api-docs'
        }
    }
};

export const config = configs[environment];