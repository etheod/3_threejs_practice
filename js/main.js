
//project5- Change geometry from cube to sphere and vice versa using perimeter

$(function(){
    
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
	var renderer = new THREE.WebGLRenderer({antialias:true});

	//backgroundColor is white
	renderer.setClearColor(0xffffff);
	//size of the renderer it assigns the size of window when loaded
	renderer.setSize(window.innerWidth, window.innerHeight);

	//enable  shadows in rendering
	renderer.shadowMap.Enabled=true;
	//smooth produced shadows
	renderer.shadowMapSoft=true;
  
	
         /*add controls*/
     var controls = new THREE.OrbitControls( camera, renderer.domElement );
     controls.addEventListener( 'change', render );
        
        
		 //8esi cameras           
		 camera.position.x = 10;
		 camera.position.y = 20;
         camera.position.z = 10; 
         camera.lookAt(scene.position);
		
		  
       $("#webGL-container").append(renderer.domElement);
        /*stats*/
        stats = new Stats();        
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';     
        $("#webGL-container").append( stats.domElement );
		

     var guiControls=new function(){
		//arxikopoihsh
		/*geometry  position*/
        this.rotationX  = 0.00;
        this.rotationY  = 0.01;
        this.rotationZ  = 0.00;
		/*material*/
         this.color = 0x000000;
         this.form = 0; // pairnei thn timh apo tis geometries
         this.wireframe = true;  
         /*mesh or line*/
         this.lineshape =  true;
        
	 }		 
		
		/*create geometries*/
		//create an array of geometries
        var genGeometryShape = [        
            boxGeometry = new THREE.BoxGeometry( 6 ,6, 6, 6),       
            //cylinderGeometry = new THREE.CylinderGeometry( 6, 6, 6, 6),     
			//dodecahedronGeometry = new THREE.DodecahedronGeometry(6),
            //icosahedronGeometry = new THREE.IcosahedronGeometry(6),
             //octahedronGeometry = new THREE.OctahedronGeometry(6),
             sphereGeometry = new THREE.SphereGeometry( 6, 32, 32),          
             //ringGeometry = new THREE.RingGeometry( 6, 6, 6),
             //torusGeometry = new THREE.TorusGeometry( 3, 3, 32, 32),
            // torusKnotGeometry = new THREE.TorusKnotGeometry( 3, 3, 32, 32)      
        ];
        var genGeometryMesh = [     
            boxGeometry = new THREE.BoxGeometry( 6 ,6, 6, 6),       
            //cylinderGeometry = new THREE.CylinderGeometry( 6, 6, 6, 6),     
            //dodecahedronGeometry = new THREE.DodecahedronGeometry(6),
            //icosahedronGeometry = new THREE.IcosahedronGeometry(6),
            //octahedronGeometry = new THREE.OctahedronGeometry(6),
            sphereGeometry = new THREE.SphereGeometry( 6, 32, 32),          
            //ringGeometry = new THREE.RingGeometry( 6, 6, 6),
            //torusGeometry = new THREE.TorusGeometry( 3, 3, 32, 32),
            //torusKnotGeometry = new THREE.TorusKnotGeometry( 3, 3, 32, 32)      
        ];      
		
		
		 /*materials and initial object creation*/       
        var materials  = [
            lineMaterial = new THREE.LineBasicMaterial({color: guiControls.color}),
            meshBasicMaterial = new THREE.MeshBasicMaterial({color: guiControls.color, wireframe:true})
            ];      
        shape =  new THREE.Line(genGeometryShape[0], materials[0]);
        mesh =  new THREE.Mesh(genGeometryMesh[0], materials[1]);
        
        /*position and add objects to scene*/       
        shape.position.x = 2.5
        shape.position.y = 6;
        shape.position.z = 2.5;
        shape.castShadow = true;
        scene.add(shape);
        
        mesh.position.x = 2.5
        mesh.position.y = 6;
        mesh.position.z = 2.5;
        mesh.castShadow = true;

		
		 /*adds controls to scene*/
        datGUI = new dat.GUI();
        var rotFolder = datGUI.addFolder('Rotation  Options');
        var shapeFolder = datGUI.addFolder('Form Options');     
        var materialFolder = datGUI.addFolder('Material Options');
        
        materialFolder.open();
        
        rotFolder.add(guiControls, 'rotationX',0,1);
        rotFolder.add(guiControls, 'rotationY',0,1);    
        rotFolder.add(guiControls, 'rotationZ',0,1);
            
        materialFolder.addColor(guiControls, 'color').onChange(function(value){
            shape.material.color.setHex (value);
            mesh.material.color.setHex (value);         
        });
        materialFolder.add(guiControls, 'lineshape').name('Line Shape').onChange(function(value){
            if (value == true){
                console.log(shape)
                scene.remove(mesh);             
                scene.add(shape = new THREE.Line(genGeometryShape[guiControls.form], materials[0]));
            }
            else{       
                console.log(mesh)               
                scene.remove(shape);
                scene.add(mesh = new THREE.Mesh(genGeometryMesh[guiControls.form], materials[1]));          
            }   
        });
        materialFolder.add(guiControls, 'wireframe').name('Wireframe').onChange(function(value){
            if (mesh.material.wireframe  == false){
                mesh.material.wireframe = true;
            }
            else{
                mesh.material.wireframe = false;
            }
        });     
        
        shapeFolder.add(guiControls, 'form',{'Box':0, 'Sphere':1}).onChange(function(value){
            if (value == 0 && guiControls.lineshape == true){                   
                scene.remove(shape);
                scene.remove(mesh);                 
                shape = new THREE.Line(genGeometryShape[0], materials[0]);
                scene.add(shape);
            }
                    
            else if (value == 1 && guiControls.lineshape == true){
                scene.remove(shape);
                scene.remove(mesh); 
                shape = new THREE.Line(genGeometryShape[1], materials[0]);
                scene.add(shape);
            }
            else if (value == 1 && guiControls.lineshape == false){
                scene.remove(shape);
                scene.remove(mesh); 
                mesh = new THREE.Mesh(genGeometryMesh[1], materials[1]);
                scene.add(mesh);
            }                   
  
        });
   //datGUI.close();
	 function render() {
        shape.rotation.x += guiControls.rotationX;
        shape.rotation.y += guiControls.rotationY;
        shape.rotation.z += guiControls.rotationZ;
        mesh.rotation.x += guiControls.rotationX;
        mesh.rotation.y += guiControls.rotationY;
        mesh.rotation.z += guiControls.rotationZ;
    }
    function animate(){ 
        requestAnimationFrame(animate);
        render();
        stats.update();     
        renderer.render(scene, camera);
    }
		
		
	    
    $(window).resize(function(){


        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;

        camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();

        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );



    });

    animate();

}); 