document.addEventListener('DOMContentLoaded', () => {
    const authModal = new bootstrap.Modal(document.getElementById('authorModal'));
    const bookModal = new bootstrap.Modal(document.getElementById('bookModal'));
    const delModal = new bootstrap.Modal(document.getElementById('deleteModal'));

    let selId = null, mod = 'auth';

    const loadAuthors = () => fetch('/authors').then(r => r.json()).then(data => {
        document.getElementById('authorsBody').innerHTML = data.map(a => `<tr onclick="sel('${a.id}','auth',this)"><td>${a.id}</td><td>${a.nombre}</td><td>${a.apellido}</td><td>${a.telefono}</td></tr>`).join('');
        document.getElementById('bookAuthor').innerHTML = '<option value="">Seleccione</option>' + data.map(a => `<option value="${a.id}">${a.nombre} ${a.apellido}</option>`).join('');
    });

    const loadBooks = () => fetch('/books').then(r => r.json()).then(data => {
        document.getElementById('booksBody').innerHTML = data.map(b => `<tr onclick="sel('${b.id}','book',this)"><td>${b.id}</td><td>${b.titulo}</td><td>${b.paginas}</td><td>${b.author?b.author.nombre + ' ' + b.author.apellido:''}</td></tr>`).join('');
    });

    window.sel = (id, type, el) => {
        document.querySelectorAll('tr').forEach(r => r.classList.remove('table-active'));
        el.classList.add('table-active');
        selId = id; mod = type;
        document.getElementById(type === 'auth' ? 'btnEditAuthor' : 'btnEditBook').disabled = false;
        document.getElementById(type === 'auth' ? 'btnDeleteAuthor' : 'btnDeleteBook').disabled = false;
    };

    const reset = () => { selId = null; document.querySelectorAll('button[id^="btnEdit"], button[id^="btnDelete"]').forEach(b => b.disabled = true); };

    document.getElementById('btnNewAuthor').onclick = () => { document.getElementById('authorForm').reset(); document.getElementById('authorEditMode').value = 'false'; document.getElementById('authorId').disabled = false; authModal.show(); };
    document.getElementById('btnNewBook').onclick = () => { document.getElementById('bookForm').reset(); document.getElementById('bookEditMode').value = 'false'; document.getElementById('bookId').disabled = false; bookModal.show(); };

    document.getElementById('btnEditAuthor').onclick = () => fetch(`/authors/${selId}`).then(r => r.json()).then(a => {
        document.getElementById('authorId').value = a.id; 
        document.getElementById('authorId').disabled = true;
        document.getElementById('authorNombre').value = a.nombre; 
        document.getElementById('authorApellido').value = a.apellido;
        document.getElementById('authorTelefono').value = a.telefono;
        document.getElementById('authorEditMode').value = 'true'; authModal.show();
    });

    document.getElementById('btnEditBook').onclick = () => fetch(`/books/${selId}`).then(r => r.json()).then(b => {
        document.getElementById('bookId').value = b.id;
        document.getElementById('bookId').disabled = true;
        document.getElementById('bookTitulo').value = b.titulo;
        document.getElementById('bookPaginas').value = b.paginas;
        document.getElementById('bookAuthor').value = b.author?b.author.id:'';
        document.getElementById('bookEditMode').value = 'true'; bookModal.show();
    });

    document.getElementById('btnSaveAuthor').onclick = () => {
        const edit = document.getElementById('authorEditMode').value === 'true';
        fetch(edit ? `/authors/${selId}` : '/authors', {
            method: edit ? 'PUT' : 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                id: document.getElementById('authorId').value,
                nombre: document.getElementById('authorNombre').value, 
                apellido: document.getElementById('authorApellido').value,
                telefono: document.getElementById('authorTelefono').value
            })
        }).then(() => { authModal.hide(); loadAuthors(); reset(); });
    };

    document.getElementById('btnSaveBook').onclick = () => {
        const edit = document.getElementById('bookEditMode').value === 'true';
        fetch(edit ? `/books/${selId}` : '/books', {
            method: edit ? 'PUT' : 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                id: document.getElementById('bookId').value,
                titulo: document.getElementById('bookTitulo').value, 
                paginas: document.getElementById('bookPaginas').value, 
                author: {id: document.getElementById('bookAuthor').value} 
            })
        }).then(() => { bookModal.hide(); loadBooks(); reset(); });
    };

    document.getElementById('btnDeleteAuthor').onclick = () => delModal.show();
    document.getElementById('btnDeleteBook').onclick = () => delModal.show();
    document.getElementById('btnConfirmDelete').onclick = () => fetch((mod==='auth'?'/authors/':'/books/') + selId, {method:'DELETE'}).then(() => { delModal.hide(); mod==='auth'?loadAuthors():loadBooks(); reset(); });

    document.getElementById('authors-tab').onclick = () => { mod='auth'; reset(); };
    document.getElementById('books-tab').onclick = () => { mod='book'; reset(); };

    loadAuthors(); loadBooks();
});
