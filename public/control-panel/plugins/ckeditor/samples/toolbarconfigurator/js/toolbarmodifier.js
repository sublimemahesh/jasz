(function(){function d(a, b){l.call(this, a, b); this.actualConfig = this.originalConfig = this.removedButtons = null; this.emptyVisible = !1; this.state = "edit"; this.toolbarButtons = [{text:{active:"Hide empty toolbar groups", inactive:"Show empty toolbar groups"}, group:"edit", position:"left", cssClass:"button-a-soft", clickCallback:function(a, b){a[a.hasClass("button-a-background")?"removeClass":"addClass"]("button-a-background"); this._toggleVisibilityEmptyElements(); this.emptyVisible?a.setText(b.text.active):a.setText(b.text.inactive)}},