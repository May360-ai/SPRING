document.addEventListener('DOMContentLoaded', () => {
    const catModal = new bootstrap.Modal(document.getElementById('categoryModal'));
    const prodModal = new bootstrap.Modal(document.getElementById('productModal'));
    const delModal = new bootstrap.Modal(document.getElementById('deleteModal'));

    let selId = null, mod = 'cat';

    const loadCats = () => fetch('/categories').then(r => r.json()).then(data => {
        document.getElementById('categoriesBody').innerHTML = data.map(c => `<tr onclick="sel('${c.id}','cat',this)"><td>${c.id}</td><td>${c.nombre}</td><td>${c.descripcion||''}</td></tr>`).join('');
        document.getElementById('productCategory').innerHTML = '<option value="">Seleccione</option>' + data.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
    });

    const loadProds = () => fetch('/products').then(r => r.json()).then(data => {
        document.getElementById('productsBody').innerHTML = data.map(p => `<tr onclick="sel('${p.nombre}','prod',this)"><td>${p.nombre}</td><td>${p.nombre}</td><td>${p.precio}</td><td>${p.stock}</td><td>${p.category?p.category.nombre:''}</td></tr>`).join('');
    });

    window.sel = (id, type, el) => {
        document.querySelectorAll('tr').forEach(r => r.classList.remove('table-active'));
        el.classList.add('table-active');
        selId = id; mod = type;
        document.getElementById(type === 'cat' ? 'btnEditCategory' : 'btnEditProduct').disabled = false;
        document.getElementById(type === 'cat' ? 'btnDeleteCategory' : 'btnDeleteProduct').disabled = false;
    };

    const reset = () => { selId = null; document.querySelectorAll('button[id^="btnEdit"], button[id^="btnDelete"]').forEach(b => b.disabled = true); };

    document.getElementById('btnNewCategory').onclick = () => { document.getElementById('categoryForm').reset(); document.getElementById('categoryEditMode').value = 'false'; catModal.show(); };
    document.getElementById('btnNewProduct').onclick = () => { document.getElementById('productForm').reset(); document.getElementById('productEditMode').value = 'false'; prodModal.show(); };

    document.getElementById('btnEditCategory').onclick = () => fetch(`/categories/${selId}`).then(r => r.json()).then(c => {
        document.getElementById('categoryId').value = c.id; document.getElementById('categoryNombre').value = c.nombre; document.getElementById('categoryDescripcion').value = c.descripcion;
        document.getElementById('categoryEditMode').value = 'true'; catModal.show();
    });

    document.getElementById('btnEditProduct').onclick = () => fetch(`/products/${selId}`).then(r => r.json()).then(p => {
        document.getElementById('productId').value = p.nombre; document.getElementById('productNombre').value = p.nombre;
        document.getElementById('productPrecio').value = p.precio; document.getElementById('productStock').value = p.stock;
        document.getElementById('productCategory').value = p.category?p.category.id:'';
        document.getElementById('productEditMode').value = 'true'; prodModal.show();
    });

    document.getElementById('btnSaveCategory').onclick = () => {
        const edit = document.getElementById('categoryEditMode').value === 'true';
        fetch(edit ? `/categories/${selId}` : '/categories', {
            method: edit ? 'PUT' : 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nombre: document.getElementById('categoryNombre').value, descripcion: document.getElementById('categoryDescripcion').value })
        }).then(() => { catModal.hide(); loadCats(); reset(); });
    };

    document.getElementById('btnSaveProduct').onclick = () => {
        const edit = document.getElementById('productEditMode').value === 'true';
        fetch(edit ? `/products/${selId}` : '/products', {
            method: edit ? 'PUT' : 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nombre: document.getElementById('productNombre').value, precio: document.getElementById('productPrecio').value, stock: document.getElementById('productStock').value, category: {id: document.getElementById('productCategory').value} })
        }).then(() => { prodModal.hide(); loadProds(); reset(); });
    };

    document.getElementById('btnDeleteCategory').onclick = () => delModal.show();
    document.getElementById('btnDeleteProduct').onclick = () => delModal.show();
    document.getElementById('btnConfirmDelete').onclick = () => fetch((mod==='cat'?'/categories/':'/products/') + selId, {method:'DELETE'}).then(() => { delModal.hide(); mod==='cat'?loadCats():loadProds(); reset(); });

    document.getElementById('categories-tab').onclick = () => { mod='cat'; reset(); };
    document.getElementById('products-tab').onclick = () => { mod='prod'; reset(); };

    loadCats(); loadProds();
});