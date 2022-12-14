const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator')

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
	// Show all products
	index: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render('products/products',{productos: products})
	},

	// Detail from one product
	detail: (req, res) => {
		
		let idURL = req.params.id;
		let productoEncontrado;

		for (let p of products){
			if (p.id==idURL){
				productoEncontrado=p;
				break;
			}
		}

		res.render('products/productDescription',{detalleProducto: productoEncontrado});

	},


	// Form to create
	create: (req, res) => {
		res.render('products/newProductForm');
	},
	
	// Create -  Method to store
	store: (req, res) => {

		let errors = validationResult(req);
		console.log("errors ", errors)

		if ( errors.isEmpty() ) {

			idNuevo=0;

		for (let s of products){
			if (idNuevo<s.id){
				idNuevo=s.id;
			}
		}

		idNuevo++;

		let nombreImagen = req.file.filename;


		let productoNuevo =  {
			id:   idNuevo,
			name: req.body.name ,
			price: req.body.price,
			category: req.body.category,
			description: req.body.description,
			image: nombreImagen
		};

		products.push(productoNuevo);

		fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));

		res.redirect('/');

		
		}
		else{
			res.render('products/newProductForm', {errors: errors.array() } ); 
		}
	
		
	},

	// Update - Form to edit
		edit: (req, res) => {

			let id = req.params.id;
			let productoEncontrado;
	
			for (let s of products){
				if (id==s.id){
					productoEncontrado=s;
				}
			}
	
			res.render('products/editProduct',{ProductoaEditar: productoEncontrado});
		},

	// Update - Method to update
	update: (req, res) => {
		
		let id = req.params.id;
		let productoEncontrado;

		for (let s of products){
			if (id==s.id){
				s.name= req.body.name;
				s.price= req.body.price;
				s.category= req.body.category;
				s.description= req.body.description;
				break;
			}
		}

		fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));

		res.redirect('/');
	},

	// Delete - Delete one product from DB
	erase : (req, res) => {

		let id = req.params.id;
		let ProductoEncontrado;

		let Nproducts = products.filter(function(e){
			return id!=e.id;
		})

		for (let producto of products){
			if (producto.id == id){
			    ProductoEncontrado=producto;
			}
		}

		fs.unlinkSync(path.join(__dirname, '../../public/img/products/', ProductoEncontrado.image));

		fs.writeFileSync(productsFilePath, JSON.stringify(Nproducts,null,' '));

		res.redirect('/');
		}
	
};

module.exports = controller;