import * as sinon from 'sinon';
<%for (const { name, path } of imports) { _%>
import { <%= name %> } from '<%= path %>';
<%_ } _%>

describe('<%= functionName %>', function() {
	// Write unit tests for the '<%= functionName %>' function here.
});
