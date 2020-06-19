import {
	<%= functionName %>,
	// Import additional module functions here.
} from "./<%= moduleName %>";
import {expect} from "chai";
import sinon from "sinon";

describe("<%= moduleName %>", function() {
	describe("<%= functionName %>", function() {
		// Write unit tests for the '<%= functionName %>' function here.
	});

	// Add describe blocks for additional module functions here.
});
