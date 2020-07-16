CREATE TABLE comments (
	id INT NOT NULL IDENTITY(1,1),
	commenter INT NOT NULL,
	comment varchar(100) NOT NULL,
	created_at datetime NOT NULL DEFAULT GetDate()

	constraint commenter FOREIGN key (commenter) REFERENCES users(id) 
	ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE INDEX commenter_index on comments(commenter)

---테이블 코멘트 다는법
---EXEC sp_updateextendedproperty 'MS_Description', '', 'user', dbo, 'table', 'commenter'

---EXEC sp_addextendedproperty 'MS_Description', '유저', 'user', dbo, 'comments', '댓글' 
---테이블 코멘트 삭제---
---EXEC sp_dropextendedproperty'MS_Description', '', 'user', dbo, 'table', '댓글'
