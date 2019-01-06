import { register, unregister } from './serviceWorker'

let location = new URL('http://localhost')
Object.defineProperty(window, 'location', {
  get() {
    return location
  },
})

function makeRegistrationMock() {
  return {
    unregister: jest.fn(),
  }
}

function makeServiceWorkerMock(registration = makeRegistrationMock()) {
  return {
    serviceWorker: {
      register: jest.fn(() => Promise.resolve(registration)),
      ready: Promise.resolve(registration),
    },
  }
}

function makeFetchMock(content, status, headers = {}) {
  headers.get = function(key) {
    return headers[key.toLowerCase()]
  }

  const response = {
    status,
    headers,
  }

  return {
    fetch: jest.fn(() => Promise.resolve(response)),
  }
}

function setupServiceWorker(registration) {
  Object.assign(
    global,
    makeFetchMock('', 200, {
      'content-type': 'text/javascript',
    })
  )

  Object.assign(global.navigator, makeServiceWorkerMock(registration))

  jest.resetModules()
}

function mockWindowOnLoad() {
  const originalAddEventListener = window.addEventListener
  window.addEventListener = jest.fn((event, callback, ...args) => {
    if (event === 'load') {
      callback()
    } else {
      originalAddEventListener(event, callback, ...args)
    }
  })
}

describe('Unsupported service worker', () => {
  beforeEach(() => {
    if (navigator.serviceWorker) {
      delete navigator.serviceWorker
    }

    process.env.NODE_ENV = 'production'
    mockWindowOnLoad()
  })

  it('does not crash when trying to register when service worker is not supported', () => {
    register()
  })
})

describe('Non-production service worker', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'test'
    setupServiceWorker()
    mockWindowOnLoad()
  })

  it('does not register in non-production environment', () => {
    register()
    expect(navigator.serviceWorker.register).not.toHaveBeenCalled()
  })
})

describe('Service worker', () => {
  let registration

  beforeEach(() => {
    process.env.NODE_ENV = 'production'
    registration = makeRegistrationMock()
    setupServiceWorker(registration)
    mockWindowOnLoad()
  })

  it('does not register with mismatching origin', () => {
    location = new URL('http://example.aaa')
    process.env.PUBLIC_URL = 'http://example.bbb'
    register()
    expect(navigator.serviceWorker.register).not.toHaveBeenCalled()
  })

  it('registers on a local domain', async () => {
    location = new URL('http://localhost')
    process.env.PUBLIC_URL = 'http://localhost'

    register()
    await setTimeout(() => {})

    expect(navigator.serviceWorker.register).toHaveBeenCalled()
  })

  it('registers on a remote domain', async () => {
    location = new URL('http://example.com')
    process.env.PUBLIC_URL = 'http://example.com'

    register()
    await setTimeout(() => {})

    expect(navigator.serviceWorker.register).toHaveBeenCalled()
  })

  it('unregisters properly', async () => {
    location = new URL('http://localhost')
    process.env.PUBLIC_URL = 'http://localhost'

    register()
    await setTimeout(() => {})

    unregister()
    await setTimeout(() => {})

    expect(registration.unregister).toHaveBeenCalled()
  })
})
