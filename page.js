"use strict";

/* global grist, window */

function getInfo(rec) {
  const result = {
    id: rec.id,
    news: parseValue(rec.Link_to_Bookmarks)
  };
  return result;
}

function updateMap(data) {
  data = data || selectedRecords;
  selectedRecords = data;
  if (!data || data.length === 0) {
    showProblem("No data found yet");
    return;
  }
 
  const tiles = L.tileLayer('news', 
                           );
  const error = document.querySelector('.error');
  if (error) { error.remove(); }
  if (amap) {
    try {
      amap.off();
      amap.remove();
    } catch (e) {
      // ignore
      console.warn(e);
    }
  }
  
  
  amap = map;
  const rowId = selectedRowId;
  if (rowId && popups[rowId]) {
    var marker = popups[rowId];
    if (!marker._icon) { marker.__parent.spiderfy(); }
    marker.openPopup();
  }
}

function selectOnMap(rec) {
  selectedRowId = rec.id;
  if (mode === 'single') {
    updateMap([rec]);
    scanOnNeed();
  } else {
    updateMap();
  }
}

grist.on('message', (e) => {
  if (e.tableId) { selectedTableId = e.tableId; }
});

grist.onRecord(selectOnMap);
if (mode !== 'single') {
  grist.onRecords((data) => {
    updateMap(data);
    scanOnNeed();
  });
}
grist.ready();
