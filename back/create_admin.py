import dotenv

dotenv.load_dotenv("./.env")

from product_api_service.database.session import create_local_session
from product_api_service.models.usuario import User
import bcrypt


with create_local_session() as sesion:
    
    passwd = bcrypt.hashpw("1234567890".encode("UTF-8"), bcrypt.gensalt())
    
    usuario_admin = User(nombre="admin", usuario="admin", correo="admin@example.com", is_admin=1,contraseña=passwd)
    
    sesion.add(usuario_admin)
    
    sesion.commit()