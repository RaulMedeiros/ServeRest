const path = require('path')
const fs = require('fs')
const swaggerUi = require('swagger-ui-express')
const packageJson = require('../../../package.json')

/**
 * Configura o Swagger UI com personalizações avançadas
 * @param {Object} app - A instância do Express
 * @param {Object} swaggerDocument - O documento Swagger (OpenAPI)
 * @param {Object} hostMapping - Mapeamento de hosts para ambientes diferentes
 * @param {Function} formaDeExecucao - Função que retorna o ambiente atual
 */
function setupSwaggerUI (app, swaggerDocument, hostMapping, formaDeExecucao) {
  const environment = formaDeExecucao()
  swaggerDocument.host = hostMapping?.[environment] ?? swaggerDocument.host
  swaggerDocument.info.version = packageJson.version

  // Carrega o CSS personalizado
  const customCssPath = path.join(__dirname, 'swagger-custom.css')
  const customCss = fs.readFileSync(customCssPath, 'utf8')

  // Carrega o plugin do GitHub
  const githubPluginPath = path.join(__dirname, 'github-plugin.js')
  const GitHubPlugin = fs.readFileSync(githubPluginPath, 'utf8')

  // Configurações avançadas para o Swagger UI
  const uiOptions = {
    customSiteTitle: 'ServeRest API Documentation',
    customfavIcon: '/favicon.ico',
    // Adiciona o plugin do GitHub através da configuração de layout
    customJs: [
      'https://unpkg.com/react@15/dist/react.min.js',
      'https://unpkg.com/react-dom@15/dist/react-dom.min.js'
    ],
    swaggerOptions: {
      plugins: [
        {
          name: 'swagger-ui-github-plugin',
          fn: function () {
            return GitHubPlugin()
          }
        }
      ],
      persistAuthorization: true,
      filter: true,
      displayRequestDuration: true,
      docExpansion: 'list',
      deepLinking: true,
      defaultModelsExpandDepth: 1,
      defaultModelExpandDepth: 1,
      displayOperationId: false
    },
    customCss,
    explorer: true
  }

  // Serve o arquivo JS do plugin diretamente
  app.get('/github-plugin.js', (req, res) => {
    res.type('text/javascript').send(GitHubPlugin)
  })

  // Configura a rota para a documentação
  app.use('/', swaggerUi.serve)
  app.get('/', (req, res) => {
    // Gera o HTML do Swagger UI com as configurações
    const html = swaggerUi.generateHTML(swaggerDocument, uiOptions)

    // Insere o script do plugin do GitHub no HTML
    const htmlWithPlugin = html.replace(
      '</head>',
      '<script src="/github-plugin.js"></script></head>'
    )

    res.send(htmlWithPlugin)
  })
}

module.exports = { setupSwaggerUI }
