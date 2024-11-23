# Documentação das Rotas da API

## URL Base

Todas as rotas são prefixadas com: `/api/v1`

## Rotas do Sensor

### Obter Dados do Sensor em Tempo Real

Recupera a temperatura e umidade atuais do sensor.

- **URL:** `/sensor/current`
- **Método:** `GET`
- **Resposta de Sucesso:**
  - **Código:** 200
  - **Conteúdo:** 
    ```json
    {
      "temperature": 25.5,
      "humidity": 60.2
    }
    ```
- **Resposta de Erro:**
  - **Código:** 500
  - **Conteúdo:** 
    ```json
    {
      "status": "error",
      "statusCode": 500,
      "message": "Erro ao ler dados do sensor"
    }
    ```

### Obter Dados Armazenados do Sensor

Recupera todos os dados do sensor armazenados no banco de dados.

- **URL:** `/sensor/data`
- **Método:** `GET`
- **Resposta de Sucesso:**
  - **Código:** 200
  - **Conteúdo:** 
    ```json
    [
      {
        "id": 1,
        "temperatura": 25.5,
        "umidade": 60.2,
        "data_hora": "2023-05-20T10:30:00Z"
      },
      {
        "id": 2,
        "temperatura": 26.0,
        "umidade": 59.8,
        "data_hora": "2023-05-20T11:30:00Z"
      }
    ]
    ```
- **Resposta de Erro:**
  - **Código:** 500
  - **Conteúdo:** 
    ```json
    {
      "status": "error",
      "statusCode": 500,
      "message": "Erro ao recuperar dados do sensor do banco de dados"
    }
    ```

## Observações

- Todas as respostas estão no formato JSON.
- Os carimbos de data/hora estão no formato ISO 8601.
- Os dados do sensor são capturados e armazenados a cada hora por uma tarefa agendada.