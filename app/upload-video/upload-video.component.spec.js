describe("WisitaUpload Component", function() {
  var $componentController, element, scope, ctrl, fileData;

  beforeEach(angular.mock.module('WistiaUpload'));

  beforeEach(angular.mock.module('upload-video.html'));

  beforeEach(inject(function($rootScope, $compile, _$componentController_, uploadVideoConfig) {
    fileData = {
      files: [{
        lastModified: 1497278286000,
        name: "Demo Wistia.flv",
        size: 24626567,
        type: "video/x-flv",
      }]
    };

    $componentController = _$componentController_;
    scope = $rootScope.$new();
    element = angular.element('<video-upload></video-upload>');
    element = $compile('<video-upload></video-upload>')(scope);
    ctrl = $componentController('videoUpload', {
      $scope: scope,
      $element: element,
    }, {});
    scope.$digest();
  }));

  it("should initialize the component's controller bindings", function() {
    expect(ctrl.progBar).toBe(false);
    expect(ctrl.ReadyPlayer).toBe(false);
    expect(ctrl.processingPlayer).toBe(false);
    expect(ctrl.error).toBe(false);
  });

  it("should simulate when the file data is submitted", function() {
    var submit = jasmine.createSpy('submit');
    fileData.submit = submit;
    ctrl.options.add({}, fileData);
    expect(submit).toHaveBeenCalled();
  });

  it("should simulate done method when the file has been successfully submitted", function() {
    ctrl.getVideo = jasmine.createSpy('getVideo');
    ctrl.options.done({}, {
      result: {
        hashed_id: "8939481nsa"
      }
    });

    expect(ctrl.getVideo).toHaveBeenCalled();
  });

  it("should send an error message when the upload fails", function() {
    var result = {
      error: "Video failed"
    };
    ctrl.options.fail({}, {
      result: result
    });
    expect(ctrl.msgErr).toBe(result.error);
    expect(ctrl.error).toBe(true);
  });

  it("should not allow non video files", function() {
    fileData.files[0].name = "uploaded_file.png";
    ctrl.options.add({}, fileData)
    expect(ctrl.error).toBe(true);
    expect(ctrl.msgErr).toBe("Please upload only Video Files.");
  });
})
