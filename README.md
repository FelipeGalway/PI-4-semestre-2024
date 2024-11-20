# PI-4-semestre-2024
PI 4 semestre fatec 2024, projeto para portfolio do curso DSM FATEC

### Alunos
➡️Felipe Ferreira Rezende

➡️Gian Carlo Fava

➡️Silvio Alves da Silva Junior

➡️Kevin de Almeida Brandão

##  **Aplicação Web com React**

## Passos para iniciar o projeto iniciar as 3 pastas
Pasta: [sensor_estatisticas_api](sensor_estatisticas_api)
Run: npm i   
Run: npm start

[user_login_api](user_login_api)
Run: npm i   
Run: npm start

[web_front_react](web_front_react)
Run: npm i   
Run: npm start   

![Demonstração](/web_front_react/src/assets/img/video.gif)


---

## **API de Análise de Dados de Sensor DHT11**

## 📖 Descrição da API

Esta API oferece uma solução abrangente para análise de dados de sensores DHT11 e gestão de usuários. Ela permite a coleta, armazenamento e análise de dados de temperatura e umidade, fornecendo estatísticas detalhadas e acesso aos dados brutos. Os usuários podem obter médias, medianas, desvios padrão, mínimos e máximos para períodos específicos, bem como estatísticas diárias e do último dia. Além disso, a API inclui um sistema completo de autenticação e gerenciamento de usuários, permitindo registro, login, atualização de perfil e exclusão de contas. Com suporte a filtragem por data e autenticação via token JWT, a API garante flexibilidade e segurança. Projetada para desenvolvedores e analistas de dados, esta API facilita a integração de dados de sensores em aplicações de monitoramento ambiental, automação residencial ou industrial, oferecendo insights valiosos sobre condições climáticas internas em tempo real e histórico.

A documentação completa da API está disponível no documento [openapi.yaml](sensor_estatisticas_api/openapi.yaml)


## 📖 Funcionalidade da API

Ela API atua como uma camada intermediária, integrando e processando dados de duas APIs distintas: a API de Sensores DHT11 e a API de Gerenciamento de Usuários. 

1. Consumo da API de Sensores DHT11: A API de Sensores é responsável por fornecer os dados brutos de temperatura e umidade coletados pelos sensores DHT11. Nossa API principal se comunica com ela para obter esses dados, que são então processados e analisados. Especificamente:

    - Ela faz requisições GET para o endpoint /sensor/data da API de Sensores para obter dados históricos, utilizando os parâmetros startDate e endDate para filtrar o período desejado.

    - Também faz requisições GET para o endpoint /sensor/current da API de Sensores para obter os dados mais recentes do sensor.

    - Os dados obtidos são então processados para calcular estatísticas, gerar médias diárias, e fornecer insights sobre temperatura e umidade.


2. Consumo da API de Gerenciamento de Usuários: A API de Gerenciamento de Usuários é utilizada para todas as operações relacionadas a autenticação e gerenciamento de contas de usuário. Nossa API principal atua como um proxy, repassando e processando as solicitações dos clientes. Especificamente:

    - Para registro de usuários, ela envia uma requisição POST para o endpoint de registro da API de Usuários.

    - Para autenticação, ela faz uma requisição POST para o endpoint de login da API de Usuários e recebe um token JWT.

    - Para operações de gerenciamento de usuários (listar, obter detalhes, atualizar, excluir), ela faz as requisições correspondentes à API de Usuários, passando o token JWT recebido do cliente para autenticação.

Nossa API principal adiciona valor ao:

- Processar e analisar os dados brutos dos sensores, fornecendo estatísticas e insights que não estão disponíveis diretamente na API de Sensores.

- Oferecer uma interface unificada para os clientes, ocultando a complexidade de lidar com duas APIs separadas.

- Implementar lógica de negócios adicional, como cálculos específicos ou validações personalizadas.

- Fornecer endpoints personalizados que combinam ou transformam dados de ambas as APIs de forma útil para os clientes finais.

Ao consumir estas duas APIs, nossa API principal atua como um orchestrator, simplificando a interação do cliente com os sistemas subjacentes e fornecendo uma camada de abstração que permite maior flexibilidade e facilidade de uso.

---

##  **Aplicação Mobile com React Native**

## 📖 Descrição do Projeto : Data Weather

O projeto Data Weather foi desenvolvido como parte do **Projeto Integrador** e consiste em uma aplicação mobile criada com **React Native** para exibir dados estatísticos de sensores, como temperatura e umidade do ar. A aplicação consome dados de uma API e pode ser executada em dispositivos Android ou emuladores utilizando **Expo** e **Android Studio**.

├── mobile/  
│ ├── data-weather/  
│ │ ├── assets/ # Recursos como imagens  
│ │ ├── components/ # Componentes React Native (Login, Dash, etc.)  
│ │ ├── App.js # Arquivo principal da aplicação  
│ │ └── ...  

---

## 🚀 Funcionalidades

1.  **Dashboard**: Apresenta informações gerais de temperatura e umidade.
2.  **Gráficos**:
    *   Gráfico de barras e linhas para temperatura.
    *   Gráfico de barras e linhas para umidade.
3.  **Projeções Estatísticas**:
    *   Previsão baseada nos dados capturados pela API.

---

## 🛠️ Tecnologias Utilizadas

*   **React Native**: Framework para o desenvolvimento mobile.
*   **Expo**: Ambiente para testes e execução do projeto.
*   **React Navigation**: Para navegação entre as telas.
*   **React Native SVG Charts**: Biblioteca para construção dos gráficos.
*   **Node.js**: Para a API do sensor.
*   **Axios**: Para consumo da API.

---

## ⚙️ Pré-requisitos para Rodar o Projeto

### 1\. Clonar o Repositório

Certifique-se de clonar o repositório que contém a aplicação e a API.

### 2\. Instalar Dependências da API

Acesse a pasta **sensor\_estatisticas\_api** e execute:

`npm install`

### 3\. Rodar a API

Dentro da pasta **sensor\_estatisticas\_api**, execute:

`npm start`

Isso iniciará a API localmente na porta `3001`.

---

## 📱 Rodando a Aplicação Mobile

### 1\. Instalar Dependências do Mobile

Acesse a pasta do projeto mobile:

`cd mobile cd data-weather npm install`

### 2\. Executar o Projeto

Inicie a aplicação usando o **Expo** para dispositivos Android ou emuladores:

`npx expo start --android`

---

## 📝 Estrutura do Projeto

.  
├── mobile/  
│ ├── data-weather/  
│ │ ├── assets/ # Recursos como imagens  
│ │ ├── components/ # Componentes React Native (Login, Dash, etc.)  
│ │ ├── services/ # Configuração da API  
│ │ ├── styles/ # Estilos personalizados  
│ │ ├── App.js # Arquivo principal da aplicação  
│ │ └── ...  
├── sensor\_estatisticas\_api/  
│ ├── package.json # Dependências da API  
│ ├── index.js # Arquivo principal da API  
│ └── ...

---

## 📋 Observações

*   Certifique-se de **configurar o IP da sua máquina na API no arquivo** `api.js` em `mobile/data-weather/services/`.
*   Para usar um dispositivo físico, ambos o dispositivo e o computador devem estar na mesma rede.

---

## 📱 Telas

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/9141c77a5270d373e18a244bb64752d39cdac25313beb68d.png)

Tela Login -  É necessário cadastrar usuário em ‘Registrar’ para ter acesso aos recursos do app.

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/9997e3b204a883338ed7821d3182ba7c76e16589d66f8f6a.png)

Tela Cadastro - Formulário de Cadastro de usuário com os campos CPF, Nome, E-mail e Senha.

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/043ba8510e8387bf6264f89f19531ff6fc26b6b829a69a66.png)

Tela Dashboard -  Mostra dados de Temperatura e Umidade atual do Sensor IoT - Faz uso de consulta da API. Tem uma funcionalidade que fará uma recomendação ao usuário a depender da temperatura e umidade lida pelo sensor. 

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/221c2223f5a41888ec45124cedc49b57875cd57394a6eccd.png)

Tela Temperatura -  Exibe dados e gráficos detalhados da temperatura a partir das rotas da API desenhadas especificamente para trazer outros dados estatísticos e históricos sobre a temperatura capturada pelo sensor.

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/b8b963950f019e0499326bd9d874e0de29e43cadf2c0d7db.png)

Tela Umidade-  Exibe dados e gráficos detalhados da umidade a partir das rotas da API desenhadas especificamente para trazer outros dados estatísticos e históricos sobre a umidade capturada pelo sensor.

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/400db7e7cd9b72fd3a0890f0adfcb97e77980bc8d2337d9a.png)

Tela Projeção-  Oferece uma análise estatística dos dados coletados pelos sensores, permitindo uma visão preditiva e resumida dos padrões de temperatura e umidade ao longo de um período. Essa funcionalidade foi projetada para atender à necessidade de interpretar tendências com base nos dados históricos fornecidos pela API.

