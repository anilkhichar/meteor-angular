Meteor.startup(function () {
  // Items.remove({});
  if (Items.find().count() === 0) {      
    for (var x = 1; x <= 5000; x++) {
      Items.insert({ datetime: (new Date()), col_3: 'col_3_row_'+x, col_4: 'col_4_row_'+x, col_5: 'col_5_row_'+x, col_6: 'col_6_row_'+x, col_7: 'col_7_row_'+x, col_8: 'col_8_row_'+x ,col_9: 'col_9_row_'+x});
    }
  }
});

Meteor.publish("items", function () {
  return Items.find({});
});


// on mongo shell
// for (var x = 1; x <= 5000; x++) { db.items.insert({ datetime: (new Date()), col_3: 'col_3_row_'+x, col_4: 'col_4_row_'+x, col_5: 'col_5_row_'+x, col_6: 'col_6_row_'+x, col_7: 'col_7_row_'+x, col_8: 'col_8_row_'+x ,col_9: 'col_9_row_'+x}); }