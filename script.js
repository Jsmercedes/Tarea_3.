document.addEventListener("DOMContentLoaded", function() {
    const contactList = document.getElementById('contact-list');
    const contactForm = document.getElementById('contact-form');
    const searchBar = document.getElementById('search-bar');
    let allContacts = []; // Array para almacenar todos los contactos

    // Función para obtener y mostrar los contactos
    async function fetchContacts() {
        try {
            const response = await fetch('http://www.raydelto.org/agenda.php');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contacts = await response.json();
            allContacts = contacts; // Guardar todos los contactos obtenidos
            displayContacts(contacts); // Mostrar los contactos
        } catch (error) {
            console.error('Error al obtener los contactos:', error);
        }
    }

    // Función para mostrar los contactos
    function displayContacts(contacts) {
        contactList.innerHTML = ''; // Limpiar la lista de contactos
        if (contacts.length === 0) {
            contactList.innerHTML = '<p>No hay contactos.</p>';
        } else {
            contacts.forEach(contact => {
                const contactDiv = document.createElement('div');
                contactDiv.classList.add('contact');
                contactDiv.textContent = `${contact.nombre} ${contact.apellido} - ${contact.telefono}`;
                contactList.appendChild(contactDiv);
            });
        }
    }

    // Función para agregar un nuevo contacto
    function addContact(contact) {
        fetch('http://www.raydelto.org/agenda.php', {
                method: 'POST',
                body: JSON.stringify(contact)
            })
            .then(() => {
                alert('Datos enviados exitosamente');
                location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Hubo un error al enviar los datos');
            });
    }


    // Manejar el envío del formulario
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const telefono = document.getElementById('telefono').value;
        const newContact = { nombre, apellido, telefono };
        addContact(newContact);
        contactForm.reset(); // Limpiar el formulario
    });

    // Manejar la búsqueda en tiempo real
    searchBar.addEventListener('input', function(event) {
        const searchTerm = event.target.value.toLowerCase();
        const filteredContacts = allContacts.filter(contact => {
            return (
                contact.nombre.toLowerCase().includes(searchTerm) ||
                contact.apellido.toLowerCase().includes(searchTerm) ||
                contact.telefono.includes(searchTerm)
            );
        });
        displayContacts(filteredContacts);
    });

    // Cargar los contactos al iniciar
    fetchContacts();
});

