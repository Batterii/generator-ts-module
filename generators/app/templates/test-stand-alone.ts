<%for (const { name, path, isDefault } of imports) { _%>
<%_    if (isDefault) { _%>
import <%= name %> from '<%= path %>';
<%    } else { _%>
import { <%= name %> } from '<%= path %>';
<%    } _%>
<%_}_%>

describe('<%= functionName %>', function() {
	// Write unit tests for the '<%= functionName %>' function here.
});
