INSERT INTO Educators (username, password, email) VALUES ('ProfPhilander', 'abcdef', 'phil@princeton.edu');
INSERT INTO Educators (username, password, email) VALUES ('BillNye', 'abcdef', 'bill@gmail.com');
INSERT INTO Educators (username, password, email) VALUES ('NeilDT', 'abcdef', 'Neil@gmail.com');
INSERT INTO Students (username, password, email) VALUES ('kathcat', 'abcdef', 'kath@gmail.com');
INSERT INTO Students (username, password, email) VALUES ('annak', 'abcdef', 'annak@gmail.com');
INSERT INTO Students (username, password, email) VALUES ('sunitac', 'abcdef', 'sunitac@gmail.com');
INSERT INTO Students (username, password, email) VALUES ('kathcat2', 'abcdef', 'kath2@gmail.com');
INSERT INTO Students (username, password, email) VALUES ('annak2', 'abcdef', 'annak2@gmail.com');
INSERT INTO Students (username, password, email) VALUES ('sunitac2', 'abcdef', 'sunitac2@gmail.com');
INSERT INTO Projects (name, location, instructions, current_announcements, root_project, EducatorId) VALUES ('Weather', 08540, 'Weather_Instructions_Philander.pdf', 'First weather observation due tomorrow!', 1, 1);
INSERT INTO Projects (name, location, instructions, current_announcements, root_project, EducatorId) VALUES ('Astronomy', 90001, 'Astronomy_Instructions_Nye.pdf', 'First astronomy observation due tomorrow!', 2, 2);
INSERT INTO Projects (name, location, instructions, current_announcements, root_project, EducatorId) VALUES ('Astronomy', 10024, 'Astronomy_Instructions_Tyson.pdf', 'First astronomy observation due tomorrow!', 2, 3);
INSERT INTO Projects (name, location, instructions, current_announcements, root_project, EducatorId) VALUES ('Weather', 90001, 'Weather_Instructions_Nye.pdf', 'First weather observation due tomorrow!', 1, 2);
INSERT INTO StudentToProjects (ProjectId, StudentId) VALUES (2,1);
INSERT INTO StudentToProjects (ProjectId, StudentId) VALUES (4,1);
INSERT INTO StudentToProjects (ProjectId, StudentId) VALUES (1,3);
INSERT INTO StudentToProjects (ProjectId, StudentId) VALUES (3,2);
INSERT INTO StudentToProjects (ProjectId, StudentId) VALUES (2,4);
INSERT INTO StudentToProjects (ProjectId, StudentId) VALUES (4,4);
INSERT INTO StudentToProjects (ProjectId, StudentId) VALUES (1,5);
INSERT INTO StudentToProjects (ProjectId, StudentId) VALUES (3,6);
INSERT INTO Fieldnotes (title, doctype, doclink, description, notedate, StudentId, ProjectId) VALUES ("Kathleen's first astronomy observation", "jpeg", "kath_obs.jpeg", "I photographed a constellation", 101, 1, 2);
INSERT INTO Fieldnotes (title, doctype, doclink, description, notedate, StudentId, ProjectId) VALUES ("Kathleen's second astronomy observation", "pdf", "kath_obs2.pdf", "I collected astronomy data in a pdf", 102, 1, 2);
INSERT INTO Fieldnotes (title, doctype, doclink, description, notedate, StudentId, ProjectId) VALUES ("Kathleen's first weather observation", "pdf", "kath_obs3.pdf", "I measured the snow fall and found that it snowed 20cm in my town over the weekend", 102, 1, 4);
INSERT INTO Fieldnotes (title, doctype, doclink, description, notedate, StudentId, ProjectId) VALUES ("Anna's first astronomy observation", "jpeg", "anna_obs.jpeg", "I photographed a constellation", 201, 2, 3);
INSERT INTO Fieldnotes (title, doctype, doclink, description, notedate, StudentId, ProjectId) VALUES ("Anna's second astronomy observation", "pdf", "anna_obs2.pdf", "I collected astronomy data in a pdf", 202, 2, 3);
INSERT INTO Fieldnotes (title, doctype, doclink, description, notedate, StudentId, ProjectId) VALUES ("Anna's third astromy observation", "pdf", "anna_obs3.pdf", "I collected more data in another pdf", 203, 2, 3);
INSERT INTO Fieldnotes (title, doctype, doclink, description, notedate, StudentId, ProjectId) VALUES ("Sunita's first weather observation", "pdf", "Sunita_obs3.pdf", "I measured humidity and collected the data in a pdf", 301, 3, 1);
INSERT INTO Fieldnotes (title, doctype, doclink, description, notedate, StudentId, ProjectId) VALUES ("Sunita's second weather observation", "pdf", "Sunita_obs3.pdf", "I measured the windspeed and collected the data in a pdf", 302, 3, 1);












