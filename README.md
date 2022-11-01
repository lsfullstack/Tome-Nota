# TOMENOTA

## TomeNota é uma api voltada para a organização do conteúdo, a fim de auxiliar o usuário na gerenciamento dos estudos, centralizando conteúdos como textos, vídeos e links de materiais complementares.

<br>

# TECNOLOGIAS
  * Typeorm
  * Typescript
  * Express NodeJs
  * Ts-node-dev
  * Bcryptjs
  * Jsonwebtoken
  * Dotenv
  * Class-transformer
  * Express-async-errors
  * Pg
  * Reflect-metadata
  * Yup

<br>

# REQUISIÇÕES

<br>

> # Create User - POST `/users`
>> ## Formato da requisição:
>
> * O `email` deve ser único;
> * Todos os campos são `obrigatórios`;
>
>```json
> {
>   "name": "Lucas Silva",
>   "email": "lucas.silva@mail.com",
>   "password": "1234",
>   "isAdm": true
> }
>```
>> ## Formato da resposta:
>
> * Status: `201 CREATED`;
> * A `password` do usuário deve ser armazenada como `hash` e `não deve ser retornada` na resposta;
>
>```json
> {
>   "id": "c95d139f-5c57-46ec-9ca7-545944a2b10b",
>   "name": "Lucas Silva",
>   "email": "lucas.silva@mail.com",
>   "isAdm": true,
>   "isActive": true,
>   "createdAt": "2022-10-21T23:19:09.501Z",
>   "updatedAt": "2022-10-21T23:19:09.501Z"
> }
>```
> ## E-mail já cadastrado
>> ## Formato da resposta:
>
> * Status: `400 BAD REQUEST`;
>
>```json
> {
>   "message": "E-mail already registered"
> }
>```
>---

<br>

> # Profile User - GET `/users/profile`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`
>
>> ## Formato da resposta:
>
> * Status: `200 OK`;
> * A `password` do usuário `não deve ser retornada` na resposta;
>
>```json
> {
>   "id": "d54d166e-5c57-46ec-9ca7-545944a2b15b",
>   "name": "Lívia Oliveira",
>   "email": "livia.oliveira@mail.com",
>   "isAdm": true,
>   "isActive": true,
>   "createdAt": "2022-10-21T23:19:09.501Z",
>   "updatedAt": "2022-10-21T23:19:09.501Z"
> }
>```
> ## Sem token / token inválido
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "Missing authorization headers",
> }
>```
>---

<br>

> # Retrieve User - GET `/users/<id>`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
>
>> ## Formato da resposta:
>
> * Status: `200 OK`;
> * A `password` do usuário `não deve ser retornada` na resposta;
>
>```json
> {
>   "id": "c95d139f-5c57-46ec-9ca7-545944a2b10b",
>   "name": "Maria Belchior",
>   "email": "maria.belchior@mail.com",
>   "isAdm": false,
>   "isActive": true,
>   "createdAt": "2022-10-21T23:19:09.501Z",
>   "updatedAt": "2022-10-21T23:19:09.501Z",
> }
>```
> ## Sem token / token inválido
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
> ## Id inválido
>> ## Formato da resposta:
>
> * Status: `404 NOT FOUND`;
>```json
> {
>   "message": "User not found"
> }
>```
>---

<br>

> # List Users - GET `/users`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
> * Necessário ser `administrador`;
>
>> ## Formato da resposta:
>
> * Status: `200 OK`;
> * A `password` dos usuários `não deve ser retornada` na resposta;
>
>```json
> [
>   {
>      "id": "b983742d-f496-4e0d-b1aa-171081b4c0ed",
>      "name": "Felipe Vieira",
>      "email": "felipe.vieira@mail.com",
>      "isAdm": false,
>      "isActive": true,
>      "createdAt": "2022-10-30T17:00:27.841Z",
>      "updatedAt": "2022-10-30T17:00:27.841Z",
>      "studyTopic": [
>        {
>          "id": "11547a442-0b6a-4920-9177-455e4769931c",
>          "name": "Desenvolvimento Web Front-End",
>          "categoria": [
>            "Tecnologia da Informação",
>            "Desenvolvimento Web",
>          ]
>        },
>        {
>          "id": "95d139f-5c57-46ec-9ca7-545944a2b10b",
>          "name": "JavaScript",
>          "categoria": [
>            "Programação",
>            "Lógica de Programação",
>          ]
>        },
>      ]
>    },
>    {
>      "id": "d43cb0e4-7e4f-4809-969e-d3afcaa3afea",
>      "name": "Letícia Angelin",
>      "email": "leticia.angelin@mail.com",
>      "isAdm": false,
>      "isActive": true,
>      "createdAt": "2022-11-01T02:01:54.416Z",
>      "updatedAt": "2022-11-01T02:01:54.416Z",
>      "studyTopic": []
>    }
> ]
>```
>
> ## Sem token / token inválido
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
> ## Sem ser administrador
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "User is not admin"
> }
>```
>---

<br>

> # Update User - PATCH `/users/:id`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
> * Apenas os campos de `name`, `email` e `password` podem ser alterados;
>  
>```json
> {
>   "name": "Lucas Developer",
>   "email": "lucas.developer@mail.com",
>   "password": "5678"
> }
>```
>> ## Formato da resposta:
>
> * Status: `200 OK`;  
> * A `password` do usuário `não deve ser retornada` na resposta;
>
>```json
> {
>   "id": "8e3d8a20-8f55-4e5c-b382-a48e0557a1d5",
>   "name": "Lucas Developer",
>   "email": "lucas.developer@mail.com",
>   "isAdm": true,
>   "isActive": true,
>   "createdAt": "2022-10-20T20:47:27.856Z",
>   "updatedAt": "2022-10-21T00:08:28.036Z"
> }
>```
> ## Sem token / token inválido
>> ## Formato da resposta:
>  
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "Missing authorization headers",
> }
>```
> ## Id inválido
>> ## Formato da resposta:
>  
> * Status: `404 NOT FOUND`;
>
>```json
> {
>   "message": "User not found",
> }
>```
>---

<br>

> # Delete User - DELETE `/users/:id`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
> 
>> ## Formato da resposta:
>
> * Propriedade isActive passa para `false`;
> * Status: `204`;
>
> ## Sem token / token inválido
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
> ## Id inválido
>> ## Formato da resposta:
>
> * Status: `404 NOT FOUND`;
>
>```json
> {
>   "message": "User not found"
> }
>```
>---

<br>

---
---

<br>

> # Login - POST `/login`
>> ## Formato da requisição:
>>
> * Necessário usuário estar ativo - `isActive = true`
>>
>```json
> {
>   "email": "nainare.reis@mail.com",
>   "password": "3256"
> }
>```
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>>
>```json
> {
>   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaXNBY3RpdmUiOnRydWUsImlhdCI6MTY2NzE0OTIzNiwiZXhwIjoxNjY3MjM1NjM2LCJzdWIiOiI3YTZiNTk0MS04YjdjLTQyZjItYWYyZC1jODAxNjMzYjdhNWYifQ.QYCFK6a9u-3cUkNgZ9yo5NmCBQ3afyutsRqDeO-_b_M"
> }
>```
> ## E-mail ou senha inválidos
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "Invalid e-mail or password",
> }
>```
>---

<br>

---
---

<br>

