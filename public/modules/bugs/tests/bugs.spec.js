'use strict';

(function() {
	// Bugs Controller Spec
	describe('Bugs Controller Tests', function() {
		// Initialize global variables
		var BugsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Bugs controller.
			BugsController = $controller('BugsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Bug object fetched from XHR', inject(function(Bugs) {
			// Create sample Bug using the Bugs service
			var sampleBug = new Bugs({
				name: 'New Bug'
			});

			// Create a sample Bugs array that includes the new Bug
			var sampleBugs = [sampleBug];

			// Set GET response
			$httpBackend.expectGET('bugs').respond(sampleBugs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bugs).toEqualData(sampleBugs);
		}));

		it('$scope.findOne() should create an array with one Bug object fetched from XHR using a bugId URL parameter', inject(function(Bugs) {
			// Define a sample Bug object
			var sampleBug = new Bugs({
				name: 'New Bug'
			});

			// Set the URL parameter
			$stateParams.bugId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/bugs\/([0-9a-fA-F]{24})$/).respond(sampleBug);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bug).toEqualData(sampleBug);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Bugs) {
			// Create a sample Bug object
			var sampleBugPostData = new Bugs({
				name: 'New Bug'
			});

			// Create a sample Bug response
			var sampleBugResponse = new Bugs({
				_id: '525cf20451979dea2c000001',
				name: 'New Bug'
			});

			// Fixture mock form input values
			scope.name = 'New Bug';

			// Set POST response
			$httpBackend.expectPOST('bugs', sampleBugPostData).respond(sampleBugResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Bug was created
			//expect($location.path()).toBe('/bugs/' + sampleBugResponse._id);
            expect($location.path()).toBe('/bugs');
		}));

		it('$scope.update() should update a valid Bug', inject(function(Bugs) {
			// Define a sample Bug put data
			var sampleBugPutData = new Bugs({
				_id: '525cf20451979dea2c000001',
				name: 'New Bug'
			});

			// Mock Bug in scope
			scope.bug = sampleBugPutData;

			// Set PUT response
			$httpBackend.expectPUT(/bugs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/bugs/' + sampleBugPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid bugId and remove the Bug from the scope', inject(function(Bugs) {
			// Create new Bug object
			var sampleBug = new Bugs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Bugs array and include the Bug
			scope.bugs = [sampleBug];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/bugs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBug);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.bugs.length).toBe(0);
		}));
	});
}());