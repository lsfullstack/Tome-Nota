# TOMENOTA

## TomeNota é uma api voltada para a organização do conteúdo, a fim de auxiliar o usuário na gerenciamento dos estudos, centralizando conteúdos como textos, vídeos e links de materiais complementares.

<br>

# TECNOLOGIAS
  * Typeorm
  * Typescript
  * Express NodeJs
  * Ts-node-dev
  * Bcrypt
  * Jsonwebtoken
  * Dotenv
  * Class-transformer
  * Express-async-errors
  * Pg
  * Reflect-metadata

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
> * Status: `409 CONFLICT`;
>
>```json
> {
>   "message": "E-mail already exists"
> }
>```
> ## Faltando campo obrigatório
>> ## Formato da resposta:
>
> * Status: `400 BAD REQUEST`;
>
>```json
> {
>   "message": "Name, e-mail, password and isAdm are required fields"
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
>   "message": "Missing authorization headers"
> }
>```
>---

<br>

> # Retrieve User - GET `/users/:id-user`
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
>   "updatedAt": "2022-10-21T23:19:09.501Z"
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
>      "updatedAt": "2022-10-30T17:00:27.841Z"
>    },
>    {
>      "id": "d43cb0e4-7e4f-4809-969e-d3afcaa3afea",
>      "name": "Letícia Angelin",
>      "email": "leticia.angelin@mail.com",
>      "isAdm": false,
>      "isActive": true,
>      "createdAt": "2022-11-01T02:01:54.416Z",
>      "updatedAt": "2022-11-01T02:01:54.416Z"
>    }
> ]
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

> # Update User - PATCH `/users/:id-user`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
> * Apenas o `administrador` pode atualizar `outros usuários`;
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
> ## Atualizando outro usuário sem ser administrador
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "User is not admin"
> }
>```
> ## Atualizando outros campos
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "Only the name, email and password fields can be changed"
> }
>```
>---

<br>

> # Delete User - DELETE `/users/:id-user`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
> * Apenas o `administrador` pode deletar `outros usuários`;
> 
>> ## Formato da resposta:
>
> * Propriedade isActive passa para `false`;
> * Status: `204 NO CONTENT`;
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
> ## Deletando outro usuário sem ser administrador
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
>   "email": "naiane.reis@mail.com",
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
> * Status: `403 FORBIDDEN`;
>
>```json
> {
>   "message": "Invalid e-mail or password"
> }
>```
>---

<br>

---
---

<br>

> # Create Study Topic - POST `/study-topics`
>> ## Formato da requisição:
> 
> * Necessário autenticação por `token`;
> 
>```json
> {
>   "name": "Desenvolvimento Web Front-End",
>   "categories": [
>     "Tecnologia da Informação",
>     "Desenvolvimento Web"
>   ]
> }
>```
>> ## Formato da resposta:
> 
> * Status: `201 CREATED`;
> 
>```json
> {
>   "id": "11547a442-0b6a-4920-9177-455e4769931c",
>   "name": "Desenvolvimento Web Front-End",
>   "categories": [
>     "Tecnologia da Informação",
>     "Desenvolvimento Web"
>   ],
>   "lessons": [],
>   "user": {
>     "id": "c95d139f-5c57-46ec-9ca7-545944a2b10b",
>     "name": "Maria Belchior",
>     "email": "maria.belchior@mail.com",
>     "isAdm": false,
>     "isActive": true,
>     "createdAt": "2022-10-21T23:19:09.501Z",
>     "updatedAt": "2022-10-21T23:19:09.501Z"
>   },
>   "createdAt": "2022-10-20T20:47:27.856Z",
>   "updatedAt": "2022-10-20T20:47:27.856Z"
> }
>```
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
>---

<br>

> # Retrieve Study Topic - GET `/study-topics/:id-study-topic`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
> 
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> {
>   "id": "11547a442-0b6a-4920-9177-455e4769931c",
>   "name": "Desenvolvimento Web Front-End",
>   "categories": [
>     "Tecnologia da Informação",
>     "Desenvolvimento Web"
>   ],
>   "lessons": [
>     {
>       "id": "6c485c93-3dc5-422c-bbc4-51223eb4ace5",
>       "name": "Estrutura básica do HTML"
>     },
>     {
>       "id": "8acbc942-3f8f-416e-95e7-9c288ec33f39",
>       "name": "Aplicando CSS no HTML"
>     }
>   ],
>   "user": {
>     "id": "c95d139f-5c57-46ec-9ca7-545944a2b10b",
>     "name": "Maria Belchior",
>     "email": "maria.belchior@mail.com",
>     "isAdm": false,
>     "isActive": true,
>     "createdAt": "2022-10-21T23:19:09.501Z",
>     "updatedAt": "2022-10-21T23:19:09.501Z"
>   },
>   "createdAt": "2022-10-20T20:47:27.856Z",
>   "updatedAt": "2022-10-20T20:47:27.856Z"
> }
>```
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
>   "message": "Study topic not found"
> }
>```
>---

<br>

> # List Study Topics - GET `/study-topics`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
>
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> [
>   {
>     "id": "11547a442-0b6a-4920-9177-455e4769931c",
>     "name": "Desenvolvimento Web Front-End",
>     "categories": [
>       "Tecnologia da Informação",
>       "Desenvolvimento Web"
>     ],
>     "lessons": [
>       {
>         "id": "6c485c93-3dc5-422c-bbc4-51223eb4ace5",
>         "name": "Estrutura básica do HTML"
>       },
>       {
>         "id": "8acbc942-3f8f-416e-95e7-9c288ec33f39",
>         "name": "Aplicando CSS no HTML"
>       }
>     ],
>     "user": {
>       "id": "c95d139f-5c57-46ec-9ca7-545944a2b10b",
>       "name": "Maria Belchior",
>       "email": "maria.belchior@mail.com",
>       "isAdm": false,
>       "isActive": true,
>       "createdAt": "2022-10-21T23:19:09.501Z",
>       "updatedAt": "2022-10-21T23:19:09.501Z"
>     },
>     "createdAt": "2022-02-20T15:50:12.856Z",
>     "updatedAt": "2022-02-20T15:50:12.856Z"
>   },
>   {
>     "id": "18637a442-0b6a-4033-9177-428e4947939e",
>     "name": "JavaScript",
>     "categories": [
>       "Programação",
>       "Lógica de Programação"
>     ],
>     "lessons": [
>       {
>         "id": "2ff79724-455d-4a41-b160-382640580f95",
>         "name": "Métodos de Array"
>       },
>     ],
>     "user": {
>       "id": "c95d139f-5c57-46ec-9ca7-545944a2b10b",
>       "name": "Maria Belchior",
>       "email": "maria.belchior@mail.com",
>       "isAdm": false,
>       "isActive": true,
>       "createdAt": "2022-10-21T23:19:09.501Z",
>       "updatedAt": "2022-10-21T23:19:09.501Z"
>     },
>     "createdAt": "2022-10-25T20:47:27.856Z",
>     "updatedAt": "2022-10-25T20:47:27.856Z"
>   }
> ]
>```
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
>---

<br>

> # Update Study Topic - PATCH `/study-topics/:id-study-topic`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
> * Apenas `name` e `categories` podem ser alterados;
>
>```json
> {
>   "name": "Front-End",
>   "categories": [
>     "Programação",
>     "Desenvolvimento Web"
>   ]
> }
>```
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> {
>   "id": "11547a442-0b6a-4920-9177-455e4769931c",
>   "name": "Front-End",
>   "categories": [
>     "Programação",
>     "Desenvolvimento Web"
>   ],
>   "lessons": [
>     {
>       "id": "6c485c93-3dc5-422c-bbc4-51223eb4ace5",
>       "name": "Estrutura básica do HTML"
>     },
>     {
>       "id": "8acbc942-3f8f-416e-95e7-9c288ec33f39",
>       "name": "Aplicando CSS no HTML"
>     }
>   ],
>   "user": {
>     "id": "c95d139f-5c57-46ec-9ca7-545944a2b10b",
>     "name": "Maria Belchior",
>     "email": "maria.belchior@mail.com",
>     "isAdm": false,
>     "isActive": true,
>     "createdAt": "2022-10-21T23:19:09.501Z",
>     "updatedAt": "2022-10-21T23:19:09.501Z"
>   },
>   "createdAt": "2022-10-20T20:47:27.856Z",
>   "updatedAt": "2022-12-05T15:12:51.856Z"
> }
>```
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
>   "message": "Study topic not found"
> }
>```
> ## Atualizando outros campos
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "Only the name and categories fields can be changed"
> }
>```
>---

<br>

> # Delete Study Topic - DELETE `/study-topics/:id-study-topic`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
> 
>> ## Formato da resposta:
>
> * Status: `204 NO CONTENT`;
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
>   "message": "Study topic not found"
> }
>```
>---

<br>

---
---

<br>

> # Create Lesson - POST `/lesson/:id-study-topic`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
>
>```json
> {
>   "name": "JavaScript - Métodos de Array"
> }
>```
>> ## Formato da resposta:
>
> * Status: `201 CREATED`;
>
>```json
> {
>   "id": "6f7b8806-38f4-4bc6-b8d7-02a0c330ef7f",
>   "name": "JavaScript - Métodos de Array",
>   "studyTopic": {
>     "id": "18637a442-0b6a-4033-9177-428e4947939e",
>     "name": "JavaScript",
>     "createdAt": "2022-10-25T20:47:27.856Z",
>     "updatedAt": "2022-10-25T20:47:27.856Z"
>   }
> }
>```
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
>
>> ## Formato da resposta:
>
> * Status: `404 NOT FOUND`;
>
>```json
> {
>   "message": "Study topic not found"
> }
>```
>---

<br>

> # List Lessons - GET `/lesson/:id-study-topic`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
>      
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> {
>   {
>     "id": "6f7b8806-38f4-4bc6-b8d7-02a0c330ef7f",
>     "name": "JavaScript - Métodos de Array",
>     "studyTopic": {
>       "id": "18637a442-0b6a-4033-9177-428e4947939e",
>       "name": "JavaScript",
>       "createdAt": "2022-10-25T20:47:27.856Z",
>       "updatedAt": "2022-10-25T20:47:27.856Z"
>     }
>   },
>   {
>     "id": "399c8de1-8881-486b-8434-4e06a968549e",
>     "name": "Funções Anônimas",
>     "studyTopic": {
>       "id": "18637a442-0b6a-4033-9177-428e4947939e",
>       "name": "JavaScript",
>       "createdAt": "2022-10-25T20:30:27.856Z",
>       "updatedAt": "2022-10-25T20:30:27.856Z"
>     }
>   }
> }
>```
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
>
>> ## Formato da resposta:
>
> * Status: `404 NOT FOUND`;
>
>```json
> {
>   "message": "Study topic not found"
> }
>```
>---

<br>

> # Retrieve Lesson - GET `/lesson/:id-lesson`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
>
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> {
>   "id": "6f7b8806-38f4-4bc6-b8d7-02a0c330ef7f",
>   "name": "JavaScript - Métodos de Array",
>   "studyTopic": {
>     "id": "18637a442-0b6a-4033-9177-428e4947939e",
>     "name": "JavaScript",
>     "createdAt": "2022-10-25T20:47:27.856Z",
>     "updatedAt": "2022-10-25T20:47:27.856Z"
>   }
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
>   "message": "Lesson not found"
> }
>```
>---

<br>

> # Update Lesson - PATCH `/lesson/:id-lesson`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
> * Apenas `name` pode ser alterado;
>
>```json
> {
>   "name": "Principais métodos de Array"
> }
>```
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> {
>   "id": "6f7b8806-38f4-4bc6-b8d7-02a0c330ef7f",
>   "name": "Principais métodos de Array",
>   "studyTopic": {
>     "id": "18637a442-0b6a-4033-9177-428e4947939e",
>     "name": "JavaScript",
>     "createdAt": "2022-10-25T20:47:27.856Z",
>     "updatedAt": "2022-10-25T20:47:27.856Z"
>   }
> }
>```
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
>   "message": "Lesson not found"
> }
>```
> ## Atualizando outros campos
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "Only the name field can be changed"
> }
>```
>---

<br>

> # Delete Lesson - DELETE `/lesson/:id-lesson`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
> 
>> ## Formato da resposta:
>
> * Status: `204 NO CONTENT`;
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
>   "message": "Lesson not found"
> }
>```
>---

<br>

---
---

<br>

> # Create Category - POST `/categories`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
> * Apenas o `administrador` pode criar as `categories`;
>
>```json
> {
>   "name": "Idiomas"
> }
>```
>> ## Formato da resposta:
>
> * Status: `201 CREATED`;
>
>```json
> {
>   "id": "5f307bd9-57a3-4f08-b393-07c9bcfe6a91",
>   "name": "Idiomas"
> }
>```
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
> ## Criando categorias sem ser administrador
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

> # List Categories - GET `/categories`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
>      
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> {
>   {
>     "id": "5f307bd9-57a3-4f08-b393-07c9bcfe6a91",
>     "name": "Idiomas"
>   },
>   {
>     "id": "a17845de-564d-420d-afce-0ef6877854ba",
>     "name": "Programação"
>   }
> }
>```
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
>---

<br>

> # Retrieve Category - GET `/categories/:id-categories`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
>
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> {
>   "id": "5f307bd9-57a3-4f08-b393-07c9bcfe6a91",
>   "name": "Idiomas"
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
>   "message": "Category not found"
> }
>```
>---

<br>

> # Update Category - PATCH `/categories/:id-categories`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
> * Apenas o `administrador` pode atualizar as `categorias`;
> * Apenas `name` pode ser alterado;
>
>```json
> {
>   "name": "Linguagem de programação"
> }
>```
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> {
>   "id": "a17845de-564d-420d-afce-0ef6877854ba",
>   "name": "Linguagem Programação"
> }
>```
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
>   "message": "Category not found"
> }
>```
> ## Atualizando outros campos
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "Only the name field can be changed"
> }
>```
> ## Atualizando categoria sem ser administrador
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

> # Delete Category - DELETE `/categories/:id-categories`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
> * Apenas o `administrador` pode deletar as categorias;
> 
>> ## Formato da resposta:
>
> * Status: `204 NO CONTENT`;
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
>   "message": "Category not found"
> }
>```
> ## Deletando categorias sem ser administrador
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

---
---

<br>

> # Create Text - POST `/text/:id-lesson`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
>
>```json
> {
>   "title": "Método ForEach"
> }
>```
>> ## Formato da resposta:
>
> * Status: `201 CREATED`;
>
>```json
> {
>   "id": "1fe4fdb6-344d-42c1-bad9-6379458d46ce",
>   "title": "Método ForEach",
>   "paragraphs": [],
>   "lesson": {
>     "id": "6f7b8806-38f4-4bc6-b8d7-02a0c330ef7f",
>     "name": "JavaScript - Métodos de Array"
>   }
> }
>```
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
>```json
> {
>   "message": "Lesson not found"
> }
>```
>---

<br>

> # List Texts - GET `/text/:id-lesson`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
>      
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> [
>   {
>     "id": "1fe4fdb6-344d-42c1-bad9-6379458d46ce",
>     "title": "Método ForEach",
>     "paragraphs": [
>       {
>         "id": "44e5d0b9-ea1c-4578-a806-10e96a484bc5",
>         "description": "O método forEach( ) executa uma dada função em cada elemento de um array."
>       },
>       {
>         "id": "574a5ddb-20b5-440e-b919-5bda4d48c4fa",
>         "description": "O forEach executa o callback fornecido uma vez para cada elemento da ordem com um valor atribuido. Ele não é invocado para propriedades de índices que foram deletados ou que não foram inicializados (por ex. em arrays esparsos)."
>       }
>     ],
>     "lesson": {
>       "id": "6f7b8806-38f4-4bc6-b8d7-02a0c330ef7f",
>       "name": "JavaScript - Métodos de Array"
>     }
>   },
>   {
>     "id": "4279dc65-d045-4f50-b4b9-e2d7bd500e06",
>     "title": "Método Map",
>     "paragraphs": [
>       {
>         "id": "897d298b-cec5-455c-b789-eb47cfbe4b12",
>         "description": "O método map( ) cria uma nova matriz preenchida com os resultados da chamada de uma função fornecida em cada elemento na matriz de chamada."
>       }
>     ],
>     "lesson": {
>       "id": "6f7b8806-38f4-4bc6-b8d7-02a0c330ef7f",
>       "name": "JavaScript - Métodos de Array"
>     }
>   },
> ]
>```
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
>```json
> {
>   "message": "Lesson not found"
> }
>```
>---

<br>

> # Update Text - PATCH `/text/:id-text`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
> * Apenas `title` pode ser alterado;
>
>```json
> {
>   "title": "Método de Array - ForEach"
> }
>```
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> {
>   "id": "1fe4fdb6-344d-42c1-bad9-6379458d46ce",
>   "title": "Método de Array - ForEach",
>   "paragraphs": [
>     {
>       "id": "44e5d0b9-ea1c-4578-a806-10e96a484bc5",
>       "description": "O método forEach( ) executa uma dada função em cada elemento de um array."
>     },
>     {
>       "id": "574a5ddb-20b5-440e-b919-5bda4d48c4fa",
>       "description": "O forEach executa o callback fornecido uma vez para cada elemento da ordem com um valor atribuido. Ele não é invocado para propriedades de índices que foram deletados ou que não foram inicializados (por ex. em arrays esparsos)."
>     }
>   ],
>   "lesson": {
>     "id": "6f7b8806-38f4-4bc6-b8d7-02a0c330ef7f",
>     "name": "JavaScript - Métodos de Array"
>   }
> }
>```
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
>```json
> {
>   "message": "Text not found"
> }
>```
> ## Atualizando outros campos
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "Only the title field can be changed"
> }
>```
>---

<br>

> # Delete Text - DELETE `/text/:id-text`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
> 
>> ## Formato da resposta:
>
> * Status: `204 NO CONTENT`;
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
>   "message": "Text not found"
> }
>```
>---

<br>

---
---

<br>

> # Create Paragraph - POST `/paragraph/:id-text`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
>
>```json
> {
>   "description": "O método forEach( ) executa uma dada função em cada elemento de um array."
> }
>```
>> ## Formato da resposta:
>
> * Status: `201 CREATED`;
>
>```json
> {
>   "id": "44e5d0b9-ea1c-4578-a806-10e96a484bc5",
>   "description": "O método forEach( ) executa uma dada função em cada elemento de um array.",
>   "text": {
>     "id": "1fe4fdb6-344d-42c1-bad9-6379458d46ce",
>     "title": "Método ForEach"
>   }
> }
>```
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
>```json
> {
>   "message": "Text not found"
> }
>```
>---

<br>

> # List Paragraphs - GET `/paragraph/:id-text`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
>      
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> [
>   {
>     "id": "44e5d0b9-ea1c-4578-a806-10e96a484bc5",
>     "description": "O método forEach( ) executa uma dada função em cada elemento de um array.",
>     "text": {
>       "id": "1fe4fdb6-344d-42c1-bad9-6379458d46ce",
>       "title": "Método ForEach"
>     }
>   },
>   {
>     "id": "574a5ddb-20b5-440e-b919-5bda4d48c4fa",
>     "description": "O forEach executa o callback fornecido uma vez para cada elemento da ordem com um valor atribuido. Ele não é invocado para propriedades de índices que foram deletados ou que não foram inicializados (por ex. em arrays esparsos).",
>     "text": {
>       "id": "1fe4fdb6-344d-42c1-bad9-6379458d46ce",
>       "title": "Método ForEach"
>     }
>   }
> ]
>```
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
>```json
> {
>   "message": "Text not found"
> }
>```
>---

<br>

> # Update Paragraph - PATCH `/text/:id-paragraph`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
> * Apenas `description` pode ser alterado;
>
>```json
> {
>   "description": "O método forEach( ) é usado para percorrer um Array, erxecutando uma função em cada elemento."
> }
>```
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> {
>   "id": "44e5d0b9-ea1c-4578-a806-10e96a484bc5",
>   "description": "O método forEach( ) é usado para percorrer um Array, erxecutando uma função em cada elemento.",
>   "text": {
>     "id": "1fe4fdb6-344d-42c1-bad9-6379458d46ce",
>     "title": "Método ForEach"
>   }
> }
>```
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
>```json
> {
>   "message": "Paragraph not found"
> }
>```
> ## Atualizando outros campos
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "Only the descrition field can be changed"
> }
>```
>---

<br>

> # Delete Paragraph - DELETE `/text/:id-paragraph`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
> 
>> ## Formato da resposta:
>
> * Status: `204 NO CONTENT`;
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
>   "message": "Paragraph not found"
> }
>```
>---

<br>

---
---

<br>
