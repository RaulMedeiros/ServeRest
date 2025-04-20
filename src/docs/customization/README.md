# Personalização do Swagger UI no ServeRest

Este diretório contém os arquivos responsáveis pela customização da interface de documentação da API do ServeRest, implementada com Swagger UI.

## Arquivos

- `swagger-custom.css` - Estilos personalizados para manter a identidade visual (preto e roxo) e modernizar a interface.
- `github-plugin.js` - Plugin para adicionar um link para o repositório GitHub no topo da página.
- `swagger-config.js` - Configurações e integração do Swagger UI com os plugins e estilos personalizados.

## Estrutura e Funcionamento

### Arquitetura

A personalização foi implementada seguindo a documentação oficial do Swagger UI sobre customização ([Swagger UI Customization](https://github.com/swagger-api/swagger-ui/tree/master/docs/customization)), com foco em:

1. **Separação de responsabilidades** - Os arquivos foram organizados para manter o código CSS separado do JavaScript.
2. **Extensibilidade** - Uso do sistema de plugins do Swagger UI para adicionar funcionalidades sem modificar o core.
3. **Manutenibilidade** - Código comentado e documentado para facilitar futuras atualizações.

### Implementação

O arquivo `swagger-config.js` é o ponto central que:

1. Carrega o CSS personalizado do arquivo `swagger-custom.css`.
2. Carrega o plugin do GitHub do arquivo `github-plugin.js`.
3. Configura as opções do Swagger UI como filtros, expansão de documentos, etc.
4. Configura a rota `/` para servir o HTML personalizado com todas as customizações integradas.

### Plugin GitHub

O plugin do GitHub (`github-plugin.js`) utiliza a API de plugins do Swagger UI para modificar o componente `Topbar` e adicionar um link para o repositório do ServeRest.

### Estilos CSS

Os estilos personalizados (`swagger-custom.css`) foram implementados para:

1. Manter as cores da identidade visual (roxo #7900e2 e preto #000000).
2. Fazer o logo do ServeRest aparecer no topo.
3. Modernizar a interface com melhorias de design (bordas arredondadas, sombras, etc.).
4. Aumentar a legibilidade e a usabilidade geral da interface.

## Como modificar

### Para alterar os estilos:

Modifique o arquivo `swagger-custom.css` mantendo as cores principais da identidade visual (roxo #7900e2 e preto #000000).

### Para adicionar novos plugins:

1. Crie um novo arquivo JavaScript no formato do `github-plugin.js`.
2. Registre o plugin em `swagger-config.js`.

### Para alterar as configurações gerais:

Modifique o objeto `uiOptions` no arquivo `swagger-config.js`.

## Referências

- [Documentação de customização do Swagger UI](https://github.com/swagger-api/swagger-ui/tree/master/docs/customization)
- [API de plugins do Swagger UI](https://github.com/swagger-api/swagger-ui/blob/master/docs/customization/plugin-api.md)
- [Configurações do Swagger UI](https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md)