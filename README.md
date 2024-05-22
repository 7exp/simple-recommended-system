#1 Install Postgresql and Node.js <br/>
#2 Go to node directory <br/>
#3 Write npm i command in terminal at node directory <br/>
#4 Execute with command nodemon index.js <br/>
<br/>
Tips:<br/>
Since the data type used in SQL is text (string) and not an array, the following steps should be taken:<br/>
<br/>
1. We need to sort the tags liked by the user as well as the tags present in the content in ascending or descending order, then convert them to a string before inserting them into the SQL database.<br/>
<br/>
2. To add or remove a tag, retrieve the tag attribute as a string, then parse it into an array/list. After adding or removing the tag, convert it back into a string and insert it into the database.<br/>
