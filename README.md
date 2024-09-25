

```markdown
# Filtering Service Project

This project implements a service to manage and store rectangles. It is built using Nest.js and TypeORM. The service receives input rectangles and checks if they intersect with a main rectangle. If they intersect, the rectangle is saved into the PostgreSQL database.

## Features

1. **Basic Rectangle Saving (Version 1):**
   - This version saves rectangles directly into the database without any intersection checks. 
   - This implementation is basic and does not consider the overlap of rectangles.

2. **Enhanced Rectangle Saving with Intersection Check (Version 2):**
   - In this version, the input rectangles are checked to see if they intersect with the main rectangle before saving.
   - Only intersecting rectangles are stored in the database.

## Project Structure


# Filtering Service Project

This project implements a service to manage and store rectangles. It is built using Nest.js and TypeORM. The service receives input rectangles and checks if they intersect with a main rectangle. If they intersect, the rectangle is saved into the PostgreSQL database.

## Features

1. **Basic Rectangle Saving (Version 1):**
   - This version saves rectangles directly into the database without any intersection checks. 
   - This implementation is basic and does not consider the overlap of rectangles.

2. **Enhanced Rectangle Saving with Intersection Check (Version 2):**
   - In this version, the input rectangles are checked to see if they intersect with the main rectangle before saving.
   - Only intersecting rectangles are stored in the database.

## Project Structure


src/
├── app.module.ts             # Main app module
├── filtering/                # Filtering module
│   ├── filtering.controller.ts   # API controller for filtering operations
│   ├── filtering.service.ts      # Main logic for rectangle filtering
│   ├── rectangle.entity.ts       # Rectangle entity for TypeORM
│   ├── filtering.service.spec.ts  # Unit tests for the service
│   └── filtering.controller.spec.ts # Unit tests for the controller
└── main.ts                   # Application entry point

```

## How to Use

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/mostafa18181/filtering-service.git
   cd filtering-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the PostgreSQL database:

   Make sure to have PostgreSQL running locally or modify the `app.module.ts` with your own database settings.

   ```typescript
   TypeOrmModule.forRoot({
       type: 'postgres',
       host: 'localhost',
       port: 5432,
       username: 'your-username',
       password: 'your-password',
       database: 'your-database',
       entities: [Rectangle],
       synchronize: true,
   })
   ```

4. Run the application:

   ```bash
   npm run start
   ```

### Using the Service

- **Add Rectangles**:
   Send a POST request to `http://localhost:3000/filtering` with the following body:

   ```json
   {
      "main": { "x": 0, "y": 0, "width": 10, "height": 20 },
      "input": [{ "x": 2, "y": 18, "width": 5, "height": 4 }]
   }
   ```

- **Retrieve Rectangles**:
   Send a GET request to `http://localhost:3000/filtering` to retrieve all stored rectangles.

### Testing

To run the unit tests for the filtering service:

```bash
npm run test
```

## Git Versioning

### Version 1 - Basic Rectangle Saving

This version saves a rectangle directly without intersection checks. You can find this implementation in the first commit.

```bash
git checkout <version-1>
```

### Version 2 - Enhanced Rectangle Saving with Intersection Check

This version improves the service by adding intersection checks before saving rectangles. You can find this implementation in the second commit.

```bash
git checkout <version-2>
```

## Further Improvements

- Add additional validations for inputs.
- Optimize the intersection checking logic for better performance with large datasets.
- Implement additional APIs to update or delete rectangles.

---

## License

This project is licensed under the MIT License.
```
