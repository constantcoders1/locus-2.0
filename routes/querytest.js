
select * from studenttoprojects, students where studenttoprojects.StudentId = students.id and studenttoprojects.ProjectId = 1

select students.longitude, students.latitude, students.username, students.id from students as t1 inner join studenttoprojects as t2 on t2.StudentId = t1.id where t2.ProjectId = 1

SELECT longitude, latitude, username, id FROM students as t1 INNER JOIN studenttoprojects as t2 on t2.StudentId = t1.id where t2.ProjectId = 1