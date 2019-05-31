pragma solidity ^0.5.0;

contract Zagite{
	
	struct Padre{
	    string nombre;
	    string apellido; 
        string cedula;
	    string email;
	    string contrasena;
		string nombreEstudiante;

	}
	struct Profesor{
	    string nombre;
	    string apellido; 
        string cedula;
	    string email;
	    string contrasena;
		string nombreEstudiante;
	
	}


	mapping (address => Padre)padres;
	mapping(address =>Profesor)profesores;

	address[] public padresAccts; 
address[]public profesoresAccts;

	
	function registrarPadres(address _address, string memory nombre, string memory apellido,string memory cedula, string memory email, string memory contrasena, string memory nombreEstudiante)public {
	    padres[_address].nombre=nombre; 
	    padres[_address].apellido=apellido;
	    padres[_address].cedula=cedula;
	    padres[_address].email=email;
	    padres[_address].contrasena=contrasena;
     	padres[_address].nombreEstudiante=nombreEstudiante;

	    padresAccts.push(_address);
	    
	}
function registrarProfesores(address _address, string memory nombre, string memory apellido,string memory cedula, string memory email, string memory contrasena,string memory nombreEstudiante)public {
	    profesores[_address].nombre=nombre; 
	    profesores[_address].apellido=apellido;
	    profesores[_address].cedula=cedula;
	    profesores[_address].email=email;
	    profesores[_address].contrasena=contrasena;
		padres[_address].nombreEstudiante=nombreEstudiante;


	    profesoresAccts.push(_address);
	    
	}

	
	
	function getPadres() view public returns (address[] memory){	
	    return padresAccts;
	    
	}
	function getProfesores() view public returns (address[] memory){	
	    return profesoresAccts;
	    
	}
	
	function getPadres(address _address) view public returns (string memory, string memory, string memory, string memory, string memory, string memory) {
	    return (padres[_address].nombre, padres[_address].apellido, padres[_address].cedula, padres[_address].email,padres[_address].contrasena, padres[_address].nombreEstudiante);
	}
	function getProfesores(address _address) view public returns (string memory, string memory, string memory, string memory, string memory) {
	    return (profesores[_address].nombre, profesores[_address].apellido, profesores[_address].cedula,profesores[_address].email, profesores[_address].contrasena);
	}
	
	
	 
	    
	}
	