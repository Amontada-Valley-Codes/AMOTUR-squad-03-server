#!/bin/bash # MUITO IMPORTANTE: Mude para bash, não sh

# Extrai o HOST e a PORTA da DATABASE_URL
# Assume um formato como postgresql://usuario:senha@host:porta/banco
DB_HOST=$(echo $DATABASE_URL | sed -E 's#.*@([^:/]+):.*#\1#')
DB_PORT=$(echo $DATABASE_URL | sed -E 's#.*:([0-9]+)/.*#\1#')

echo "Esperando o banco de dados em $DB_HOST:$DB_PORT..."

# Loop até que a porta do banco de dados esteja aberta
until (echo > /dev/tcp/$DB_HOST/$DB_PORT) &>/dev/null; do
  echo "Banco de dados não está pronto ainda. Tentando novamente em 3 segundos..."
  sleep 3
done

echo "Banco de dados está online! Rodando as migrações..."

# Executa as migrações do Prisma
npx prisma migrate deploy

echo "Executando seed inicial..."
node seed.js

echo "Iniciando o NestJS..."

# Inicia a aplicação NestJS
node dist/main