// Plugin para adicionar link do GitHub no topo da página
function GitHubPlugin () {
  // Esta função é chamada quando o Swagger UI é inicializado
  return {
    components: {
      Topbar: (Original, system) => (props) => {
        return system.React.createElement('div', { className: 'topbar' },
          // Renderiza o componente original primeiro
          system.React.createElement(Original, props),

          // Adiciona o link do GitHub
          system.React.createElement('a', {
            className: 'github-link',
            href: 'https://github.com/ServeRest/ServeRest/',
            target: '_blank',
            rel: 'noopener',
            'aria-label': 'GitHub',
            style: {
              position: 'absolute',
              right: '20px',
              top: '15px',
              width: '24px',
              height: '24px',
              zIndex: '1',
              backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTEyIDBjLTYuNjI2IDAtMTIgNS4zNzMtMTIgMTIgMCA1LjMwMiAzLjQzOCA5LjggOC4yMDcgMTEuMzg3LjU5OS4xMTEuNzkzLS4yNjEuNzkzLS41NzcgMC0uMjg1LS4wMS0xLjA0LS4wMTUtMi4wNC0zLjMzOC43MjQtNC4wNDItMS42MS00LjA0Mi0xLjYxQTMuMTggMy4xOCAwIDAwNi4xMyA3Ljc1N2MtMS4wODctLjc0NC4wODQtLjcyOS4wODQtLjcyOSAxLjIwNS4wODQgMS44MzggMS4yMzYgMS44MzggMS4yMzYgMS4wNyAxLjgzNSAyLjgwOSAxLjMwNSAzLjQ5NS45OTguMTA4LS43NzYuNDE3LTEuMzA1Ljc2LTEuNjA1LTIuNjY1LS4zLTUuNDY2LTEuMzMyLTUuNDY2LTUuOTMgMC0xLjMxLjQ2NS0yLjM4IDEuMjM1LTMuMjItLjEzNS0uMzAzLS41NC0xLjUyMy4xMDUtMy4xNzYgMCAwIDEuMDA1LS4zMjIgMy4zIDEuMjMuOTYtLjI2NyAxLjk4LS4zOTkgMy0uNDA1IDEuMDIuMDA2IDIuMDQuMTM4IDMgLjQwNSAyLjI4LTEuNTUyIDMuMjg1LTEuMjMgMy4yODUtMS4yMy42NDUgMS42NTMuMjQgMi44NzMuMTIgMy4xNzYuNzY1Ljg0IDEuMjMgMS45MSAxLjIzIDMuMjIgMCA0LjYxLTIuODA1IDUuNjI1LTUuNDc1IDUuOTIuNDIuMzYuODEgMS4wOTYuODEgMi4yMiAwIDEuNjA2LS4wMTUgMi44OTYtLjAxNSAzLjI4NiAwIC4zMTUuMjEuNjkuODAxLjU3QzIwLjU2NSAyMS43OTYgMjQgMTcuMzAxIDI0IDEyY0MyNCA1LjM3MyAxOC42MjcgMCAxMiAweiIvPjwvc3ZnPg==')",
              backgroundRepeat: 'no-repeat',
              backgroundSize: '24px 24px'
            }
          })
        )
      }
    }
  }
}

export default GitHubPlugin
