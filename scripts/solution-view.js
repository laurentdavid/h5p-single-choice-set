var H5P = H5P || {};
H5P.SingleChoiceSet = H5P.SingleChoiceSet || {};

H5P.SingleChoiceSet.SolutionView = (function ($) {
  /**
  * Constructor function.
  */
  function SolutionView (id, choices, l10n){
    var self = this;
    self.id = id;
    this.choices = choices;

    this.$solutionView = $('<div>', {
      'class': 'h5p-sc-solution-view'
    });

    // Add header
    this.$header = $('<div>', {
      'class': 'h5p-sc-solution-view-header'
    }).appendTo(this.$solutionView);

    // Close solution view button
    $('<button>', {
      'role': 'button',
      'tabindex': 0,
      'aria-label': l10n.backButtonLabel,
      'class': 'h5p-joubelui-button h5p-sc-close-solution-view',
      'click': function () {
        self.hide();
      }
    }).appendTo(this.$header);
    this.$header.append('<div class="h5p-sc-solution-view-title">' + l10n.solutionViewTitle + '</div>');

    self.populate();
  }

  /**
   * Will append the solution view to a container DOM
   * @param  {jQuery} $container The DOM object to append to
   */
  SolutionView.prototype.appendTo = function ($container) {
    this.$solutionView.appendTo($container);
  };

  /**
   * Shows the solution view
   */
  SolutionView.prototype.show = function () {
    var self = this;
    self.$solutionView.addClass('visible');

    $(document).on('keyup.solutionview', function (event) {
      if (event.keyCode === 27) { // Escape
        self.hide();
        $(document).off('keyup.solutionview');
      }
    });
  };

  /**
   * Hides the solution view
   */
  SolutionView.prototype.hide = function () {
    this.$solutionView.removeClass('visible');
  };

  /**
   * Populates the solution view
   */
  SolutionView.prototype.populate = function () {
    var self = this;
    self.$choices = $('<dl>', {
      'class': 'h5p-sc-solution-choices',
      'tabindex': 0
    });
    this.choices.forEach(function (choice, index) {
      var questionId = 'solution-single-choice-' + self.id + '-question-' + index;

      if (choice.question && choice.answers && choice.answers.length !== 0) {
        self.$choices.append($('<dt>', {
          'id': questionId,
          'class': 'h5p-sc-solution-question',
          html: choice.question
        }));
        self.$choices.append($('<dd>', {
          'class': 'h5p-sc-solution-answer',
          html: choice.answers[0]
        }));
      }
    });
    self.$choices.appendTo(this.$solutionView);
  };

  return SolutionView;
})(H5P.jQuery);
