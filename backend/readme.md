# Vrumcar

Este projeto possui uma API desenvolvida em Node.js + Typescript + TypeORM. 

O frontend foi desenvolvido em Angular com Angular Material. 

## Como configurar e executar o Frontend?

Para executar basta ter instalado em sua máquina o Angular CLI e executar o comando ```ng serve```.
Opcionalmente, você pode alterar a ```apiUrl``` do projeto no ```environment.ts```.

```
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
};
```

## Como configurar e executar a API?

1. Você precisará ter o Node.js instalado ao menos na versão LTS.
2. Você deverá ter instalado localmente ou remotamente um banco de dados PostgreSQL.
3. Configure o arquivo .env conforme o .env.example

```
JWT_SECRET=

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

4. Execute o comando  ```npm install``` na raiz do projeto para instalar todas as dependências.
5. Após finalizar e ter configurado tudo acima, execute ```npm run migrate:up``` para executar as migrations e criar as tabelas no banco de dados.
6. Verifique no seu banco se as tabelas ```users``` e ```vehicles``` foram criadas.
7. Execute ```npm run dev``` e veja se a API está sendo executada e exposta.
8. (opcional) execute o comando no Postman ou qualquer outra ferramenta de sua escolha para popular a tabela de veículos: ```curl --location --request POST 'localhost:3000/vehicles/seed'```

### Endpoints

Para facilitar, utilize os curl abaixo para efetuar as requisições

#### Users

Endpoints relacionados ao usuário

##### Criar usuário
```
curl --location --request POST 'localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Rafael",
    "email": "teste@gmail.com",
    "password": "12345"
}'
```

##### Recuperar usuário autenticado
```
curl --location --request GET 'localhost:3000/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1ZmYzZjZjLWExMDctNDc4OC04MzEzLWJhM2JmMTRiNjBlZSIsIm5hbWUiOiJSYWZhZWwiLCJlbWFpbCI6InJhZnJhbWlsQGdtYWlsLmNvbSIsImlhdCI6MTYyMDQ3NzgwNCwiZXhwIjoxNjIwNTY0MjA0fQ.UxSuG-9RHmNAu2i9UVLpTTtzVO26aQd3W_QJ4lEWLH4' \
--header 'Content-Type: application/json'
```

##### Autenticação
```
curl --location --request POST 'localhost:3000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "teste@gmail.com",
    "password": "12345"
}'
```

#### Veículos

Endpoints relacionados aos veículos

##### Criar veículo

```
curl --location --request POST 'localhost:3000/vehicles' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1ZmYzZjZjLWExMDctNDc4OC04MzEzLWJhM2JmMTRiNjBlZSIsIm5hbWUiOiJSYWZhZWwiLCJlbWFpbCI6InJhZnJhbWlsQGdtYWlsLmNvbSIsImlhdCI6MTYyMDU2Njk5OCwiZXhwIjoxNjIwNjUzMzk4fQ.UIC-eW5ejDg6MXU_U4KheXSVryOvJIp5SsUaLwXTp9M' \
--header 'Content-Type: application/json' \
--data-raw '{
    "model": "Corolla",
    "brand": "Toyota",
    "year": 2015,
    "color": "Branca",
    "vehicle_type": "Sedan",
    "plate_number": "BRA3282",
    "mileage": 10000,
    "image": "https://quatrorodas.abril.com.br/wp-content/uploads/2019/12/dscf2836.dng_-e1580396644879.jpg?quality=70&strip=info"
}'
```

##### Listar veículos

Você pode, opcionalmente, passar um query param ```query``` com os valores ```disponiveis``` ou ```alugados``` para filtrar sua busca.

```
curl --location --request GET 'localhost:3000/vehicles' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1ZmYzZjZjLWExMDctNDc4OC04MzEzLWJhM2JmMTRiNjBlZSIsIm5hbWUiOiJSYWZhZWwiLCJlbWFpbCI6InJhZnJhbWlsQGdtYWlsLmNvbSIsImlhdCI6MTYyMDU2Njk5OCwiZXhwIjoxNjIwNjUzMzk4fQ.UIC-eW5ejDg6MXU_U4KheXSVryOvJIp5SsUaLwXTp9M'
```

```
curl --location --request GET 'localhost:3000/vehicles?query=disponiveis' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1ZmYzZjZjLWExMDctNDc4OC04MzEzLWJhM2JmMTRiNjBlZSIsIm5hbWUiOiJSYWZhZWwiLCJlbWFpbCI6InJhZnJhbWlsQGdtYWlsLmNvbSIsImlhdCI6MTYyMDU2Njk5OCwiZXhwIjoxNjIwNjUzMzk4fQ.UIC-eW5ejDg6MXU_U4KheXSVryOvJIp5SsUaLwXTp9M'
```

##### Alugar veículo

```
curl --location --request PATCH 'localhost:3000/vehicles' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEyOWM4M2JlLTg3N2MtNDQ3NC1iMGY3LTRhOTI2ZmY5NmQzYiIsIm5hbWUiOiJSYWZhZWwiLCJlbWFpbCI6InJhZnJhbWlsQGdtYWlsLmNvbSIsImlhdCI6MTYyMDU4NDY2NiwiZXhwIjoxNjIwNjcxMDY2fQ.vIGjBLv1HEAGa87BTQsE-YQalKfacFaZjSGaOUU6eIM' \
--header 'Content-Type: application/json' \
--data-raw '{
    "action": "rent",
    "vehicleId": "f249a561-55c9-47f7-85ea-74083fd76f5d"
}'
```

##### Devolver veículo

```
curl --location --request PATCH 'localhost:3000/vehicles' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEyOWM4M2JlLTg3N2MtNDQ3NC1iMGY3LTRhOTI2ZmY5NmQzYiIsIm5hbWUiOiJSYWZhZWwiLCJlbWFpbCI6InJhZnJhbWlsQGdtYWlsLmNvbSIsImlhdCI6MTYyMDYwNzAxNCwiZXhwIjoxNjIwNjkzNDE0fQ.L_URyHfO0WCgStlViZCOrlnW8LqVhjg6gF2H8BY4BJs' \
--header 'Content-Type: application/json' \
--data-raw '{
    "action": "return",
    "vehicleId": "f249a561-55c9-47f7-85ea-74083fd76f5d"
}'
```