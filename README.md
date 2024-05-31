# DT207G, Backend-baserad webbutveckling
## Projektuppgift, API

Detta repo innehåller koden för en webbtjänst som sköter en meny, samt användare och inloggning.

### Länk till API
https://backend-projekt-webservice.onrender.com

### Användning
#### Admin
| Metod | Ändpunkt | Beskrivning |
|-------|----------|-------------|
| POST | /admin/register | Registrera användare med användarnamn och lösenord|
| POST | /admin/login | Logga in användare med användarnamn & lösenord |

Registrering & inloggning skickas med följande struktur:
```
{
  "username": "exempe",
  "password": "password"
}
```
#### Meny
| Metod | Ändpunkt | Beskrivning |
|-------|----------|-------------|
| GET | /menu/dishes | Hämta alla maträtter i menyn |
| POST | /menu/dishes | Lägga till maträtt med namn, ingredienser, pris och kategori |
| PUT | /menu/dishes/id | Uppdatera maträtt med namn, ingredienser, pris och kategori |
| PUT | /menu/dishes/id | Radera maträtt |

Maträtt skickas med följande struktur:
```
{
  "name": "Pasta",
  "ingredients": "Pasta",
  "Price": "100",
  "category": "Pasta"
}
```
