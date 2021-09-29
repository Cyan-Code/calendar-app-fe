import { fetchConToken, fetchSinToken } from "../../components/helpers/fetch"


describe('Pruebas en el Helper Fetch', () => {

  let token = ''

  test('FetchSinToken deve de Funcionar', async () => {
    const resp = await fetchSinToken('auth', {email: 'test@gmail.com', password:'TestApp!123'}, 'POST')
    expect( resp instanceof Response ).toBe(true)

    const body = await resp.json()
    expect( body.ok ).toBe(true)

    token = body.token
  })

  test('fetchConToken debe Funcionar', async() => { // Esta prueba esta validando que el backend Recibe un token
    localStorage.setItem('token', token)
    const resp = await fetchConToken('events/614bc49dfc4d6602028e5e83', {}, 'DELETE')
    const body = await resp.json()
    
    expect( body.msg ).toBe('El evento no existe por ese ID')

  })
  
  
})
