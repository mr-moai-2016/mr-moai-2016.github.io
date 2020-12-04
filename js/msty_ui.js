/* 0-byte avoidance */

function MstyUI_detailBtn( tgt_id, btn_id, open_lbl, close_lbl ){
	var tgt=document.getElementById( tgt_id );
	var btn=document.getElementById( btn_id );
	if( tgt.className=='MstyUnvisible' ){
		tgt.className = 'MstyVisible';
		btn.innerHTML = close_lbl;
	} else{
		tgt.className = 'MstyUnvisible';
		btn.innerHTML = open_lbl;
	}
}

