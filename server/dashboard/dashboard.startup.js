Meteor.startup(function() {
  Records.remove({});
  if (Records.find().count() === 0) {
    for (var i = 1; i <= 1000; i++) {
      var date_now = new Date();
      Records.insert(
        {
          'col1': i,
          'col2': 'option'+i,
          'col3': 'col_3_row_'+i,
          'col4': 'col_4_row_'+i,
          'col5': 'col_5_row_'+i,
          'col6': 'col_6_row_'+i,
          'col7': 'col_7_row_'+i,
          'col8': 'col_8_row_'+i,
          'col9': 'col_9_row_'+i,
          'col10': 'col_10_row_'+i
        }
      );
    }
  }
  
  Meteor.publish('records', function(){
		return Records.find();
  });

});