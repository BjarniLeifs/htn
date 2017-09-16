

function Querybuilder () {
		/*
	This is do insert new things into the database. Meaning the inserTable is information string on which table this is
	while the data is the data it serlf. This allows the function to make string insert into "name of table" (property2, property2) values ($1, $2)
	Then it returns it with ofther informaiton as an object. See return statement.
	*/
	this.insert = (object, callback) => {


		try {
			let length = Object.keys(object.data).length;
			let buildString = 'INSERT INTO '+ object.insertTable + '(';
			let values ='(';
			let finalString = '';
			let dataBuilt = [];
			let count = 0;
			let err;
			
		// Building the iteration to string, such it uses correct way in the system to hanlde any sql injections. 
			for(let item in object.data) {
				count += 1;
				if (count < length) {
					values += '$'+count;
					buildString += item+',';
				} else {
					buildString = item +')';	
					values += '$'+count+')';
				}
				dataBuilt.push(item.data);
			}
			finalString = buildString + values;

		} catch (e) {
			error = e;
		}

		callback({
			table    : updateTable,
			itemNumb : count,
			err 	 : error, 
			string   : buildString,
			value    : data
		});
	};
	
	/*
	* Expected object to be:
		{
			data: the data,
			updateTable: name of the table to work with.
			where : the column to find that is updated..
			whereValue: The value of the where column is.
		}

	*/

	this.update = (object, callback) => {
			let length = Object.keys(object.data).length;
			let count = 0;
			let buildString = 'UPDATE '+ object.updateTable + ' SET ';
			let dataBuilt = [];
			let error;	
			
    	try {
    		
			for(let item in object.data) {
			 
				count += 1;
				if (count == length) {
					buildString += '' + item + ' = ($' + count + ') ';
					dataBuilt.push(object.data[item]);

				} else {
					buildString += '' + item + ' = ($' + count + '), ';
					dataBuilt.push(object.data[item]);
				}
				error = false;	
				
			}

			buildString += ' where ' + object.where + ' = ' + '($' + (count+1) + ') returning *';
			dataBuilt.push(object.whereValue);

			
			
      	} catch(e) {
      		error = e;
      	}


		callback(error, {
			table    : object.updateTable,
			property : object.where,
			itemNumb : count+1,
			err 	 : error, 
			string   : buildString,
			value    : dataBuilt
		});
	};


}

module.exports = new Querybuilder();
