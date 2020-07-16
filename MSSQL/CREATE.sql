CREATE TABLE users (
id INT NOT NULL IDENTITY(1,1),
name NVARCHAR(20) NOT NULL,
age INT NOT NULL,
married TINYINT NOT NULL,
comment TEXT NOT NULL,
create_at DATETIME NOT NULL DEFAULT GETDATE(),
PRIMARY KEY(id)) 

CREATE UNIQUE INDEX name_UNIQUE ON users(name asc)


걍 여기봐라
https://rocabilly.tistory.com/215 