# Proof of Concept: Uso básico da Optimization API

A API da Google Cloud para roteamento de frotas de veículos faz parte da categoria de "Optimization AI's" da Google Cloud.

Ela tem algumas bibliotecas cliente para se comunicar com mais facilidade com a API, mas apenas para [C++, Java e Python](https://cloud.google.com/optimization/docs/optimize_tours_client_libraries#client-libraries-install-cpp).

Felizmente, existem endpoints que podem ser utilizados para executar as mesmas [funções](https://cloud.google.com/optimization/docs/optimize_tours_command_line), então é possível utilizar essa API em qualquer linguagem no final.

- Link para documentação oficial: https://cloud.google.com/optimization/docs/overview;
- Link para documentação dos endpoints REST: https://cloud.google.com/optimization/docs/reference/rest;
- Link para documentação dos serviços [gRPC](https://grpc.io/): https://cloud.google.com/optimization/docs/reference/rpc;

## Iniciando o projeto

Como primeiros passos, precisamos fazer algumas coisas:

Na GCP:

1. Criar uma conta na GCP;
2. Criar um projeto;
3. No menu "APIs & Services":

- Abrir o submenu "Credentials";
- Gerar uma API Key e armazená-la;
- Criar uma conta de serviço e guardar o arquivo JSON gerado;
- Com o arquivo JSON em mãos, devemos criar uma variável de ambiente chamada `GOOGLE_APPLICATION_CREDENTIALS` que terá o caminho até este arquivo JSON, ele servirá como base para fazer a autenticação necessária nos serviços da GCP.


Localmente:

1. [Instalar a Google Cloud CLI](https://cloud.google.com/sdk/docs/install);
2. Utilizar o comando `gcloud auth login` para autenticar a GCP CLI com a conta Google;
3. Configurar o ID do projeto com o comando `gcloud config set project PROJECT_ID_AQUI`;

Com isso, podemos fazer requests via cURL, utilizando:
```sh
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: project-id" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://cloudoptimization.googleapis.com/v1/projects/project-id:optimizeTours"
```

O comando `gcloud auth print-acess-token` irá nos dar um token de autorização para realizar a requisição pela CLI.
Porém, precisamos fazer a requisição via aplicação Node.js, então devemos fazer um _setup_:

4. Instalar a biblioteca `google-auth-library`;
5. Criar o arquivo `.env` baseado no `.env.example`;
6. Criar o cliente de autenticação usando a classe `GoogleAuth`;
7. Recuperar o cliente e o ID do projeto;
8. Utilizar o método `request` para realizar requisições;
