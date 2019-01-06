describe('application', () => {
  beforeEach(() => {
    jest.resetModules()
    const root = document.createElement('div')
    const originalGetElementById = global.document.getElementById
    global.document.getElementById = jest.fn(id => {
      if (id === 'root') {
        return root
      } else {
        return originalGetElementById(id)
      }
    })
  })

  it('does not crash', async () => {
    await import('./index')
  })

  it('registers the service worker', async () => {
    const serviceWorker = await import('./serviceWorker')
    serviceWorker.register = jest.fn()
    await import('./index')
    expect(serviceWorker.register).toHaveBeenCalled()
  })
})
