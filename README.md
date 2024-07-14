## README Notes

### Summary
This application allows for a healthcare provider to access patient data including, first and last name, age, temperature readings, and medications.  The provider can add or modify a temperature and add or remove a medication. Test data is uploaded to database on first migration.

The tech stack includes Django REST Framework, React, Next.js, TailwindCSS, Chart.js (new to me, also considered D3).

### Instructions
- Open two terminal windows at top level
- Back-End Setup Commands
    - python3 -m venv env
    - source env/bin/activate
    - cd back_end
    - pip install djangorestframework
    - python3 manage.py migrate
    - python3 manage.py runserver
- Front-End Setup (in new terminal window)
    - cd front_end
    - npm install
    - npm run dev
- Open http://localhost:3000

### Assumptions
- As authentication was not mentioned and due to the scope of the test, did not implement any auth or user management.
- For fields like first name, last name, name of medication are at or below 256 characters.
- For temperature, assumed that it would be taken and recorded on the same day setting date to the current date of submission. Also assumed that no one would have a temperature over 9,999 celsius. Only one add temperature operation per day.
- Included height, weight, gender that were in the database but not on the client side since they were in the dataset but not specified in the instructions.

### Next Steps
- In short: pagination, comments, tests, documentation, create components (DRY).
- Generally assumed a happy path.  Could add better validation and error handling on the client side.
- Make more mobile responsive if website will be used on mobile.
- Add sorting options for medications and patient’s list.
- Breaking up dosage into decimal and measurement and serializing both fields to confirm accuracy.
- Adjust the body temperature graph to the view desired by providers.
- Depending on company code styling, move to that style.
- Inquire into making chart more efficient.

### Resources Referenced
- Django REST Framework documentation
- React documentation
- Next.js documentation
- TailwindCSS documentation
- Chart.js documentation
- SVG Repo
