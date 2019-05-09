import os

db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/pascual-final-project1')

secret = os.getenv('SECRET', ',shhh its a secret')
