Projeto criado para o desafio do módulo 1 da rocketseat, conceitos de React Native
Para este projeto foi utilizado o backend desenvolvido no módulo 1 de Node JS na porta :3333.

Objetivo apenas para listar os dados encontrados na API e acrescentar a funcionalidade de Like no botão de curtir

## Scripts disponíveis

Para rodar o projeto basta executar

### `yarn`

Para instalar as dependências da aplicação

### `adb -s <device name> reverse tcp:3333 tcp:3333`

Presumindo que a sdk do android já esteja instalada na sua máquina, e que seu dispositivo esteja conectado, 
habilitado modo desenvolvedor e depuração usb, e ao rodar adb devices, o dispositivo esteja como "device"

Este comando irá dizer que a porta 3333 encontrada no seu dispositivo android se equivale a porta 3333 do seu localhost


### `npx react-native react-android`

Roda a aplicação no seu emulador ou no seu dispositivo conectado (por padrão, porta 8081)


### `yarn test`

Para executar os testes necessários para a aplicação ser considerada criada com sucesso

## Fundamentos

Neste projeto foram colocados em prática os conhecimentos adquiridos no módulo 1 do curso de React Native,
porém, sem muitas novidades de funcionalidades, dado em conta que são bem parecidas com as do React, apenas mudando a forma de escrever Tags pois nao é permitido HTML no React Native

- React-Native;
- View;
- Text;
- FlatList;
- Events;

## Observações
Muito perrengue para utilizar o Android Studio, emular pelo celular aparentou ser uma forma mil vezes mais fácil