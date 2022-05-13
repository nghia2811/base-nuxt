<template>
    <div class="jq-cheat-sheet">
        <div class="cheat-sheet-container">
            <table>
                <tbody>
                <tr>
                    <td>
                        <section>
                            <h3>Basic filters</h3>
                            <div>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div>.</div>
                                        </td>
                                        <td>
                                            <div>IDentity</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>.<em>foo</em> .<em>foo</em>?</div>
                                        </td>
                                        <td>
                                            <div>Value of "<em>foo</em>" key</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>.[] .[]?</div>
                                        </td>
                                        <td>
                                            <div>Array iterator. Produce each element of an input array, or each value of an object</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>.[<em>n</em>]</div>
                                        </td>
                                        <td>
                                            <div><em>n</em><sup>th</sup> element of an array (<em>n</em> can be negative : -1 -&gt; last element...)
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>.[<em>n</em>:<em>m</em>]</div>
                                        </td>
                                        <td>
                                            <div>Array slice : array containing <em>n</em><sup>th</sup> (inclusive) to <em>m</em><sup>th</sup> (exclusive)
                                                elements
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div><em>A</em>,<em>B</em></div>
                                        </td>
                                        <td>
                                            <div>Produces output of filter <em>A</em> then <em>B</em> (both <em>A</em> and <em>B</em> are fed with the same
                                                input)
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div><em>A</em>|<em>B</em></div>
                                        </td>
                                        <td>
                                            <div>Output of <em>A</em> is sent to <em>B</em>'s input</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>( A )</div>
                                        </td>
                                        <td>
                                            <div>Grouping operator</div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        <section>
                            <h3>Types and Values</h3>
                            <div>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div>[ ], { }</div>
                                        </td>
                                        <td>
                                            <div>Array (resp. Object) construction</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>..</div>
                                        </td>
                                        <td>
                                            <div>Recursive descent</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>+ - * / %</div>
                                        </td>
                                        <td>
                                            <div>Basic arithmetic / string / array / object operators</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>length</div>
                                        </td>
                                        <td>
                                            <div>string / array / object length</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>keys | keys_unsorted</div>
                                        </td>
                                        <td>
                                            <div>The sorted/unsorted set of the input object keys.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>has( <em>KEY</em> )</div>
                                        </td>
                                        <td>
                                            <div>Whether the input object as the given <em>KEY</em>.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>in( <em>A</em> )</div>
                                        </td>
                                        <td>
                                            <div>Whether the input key is in the given <em>A</em> object.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>map ( <em>A</em> )</div>
                                        </td>
                                        <td>
                                            <div>Run the <em>A</em> filter for each element of the input array. Equivalent to <strong>[.[] |
                                                <em>A</em>]</strong></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>map_values( <em>A</em> )</div>
                                        </td>
                                        <td>
                                            <div>Run the <em>A</em> filter for each element of the input object. Equivalent to <strong>.[]
                                                |=<em>A</em></strong></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>del ( <em>x</em> )</div>
                                        </td>
                                        <td>
                                            <div>Removes a key and its value from an object</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>select ( <em>foo</em> )</div>
                                        </td>
                                        <td>
                                            <div>Produces input unchanged if <em>foo</em> is true for that input.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>type</div>
                                        </td>
                                        <td>
                                            <div>Returns the type of its argument as a string.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>arrays, objects, iterables, booleans, numbers, normals, finites, strings, nulls, values, scalars</div>
                                        </td>
                                        <td>
                                            <div>These built-ins select only inputs that are arrays, objects, iterables (arrays or objects), booleans,
                                                numbers, normal numbers, finite numbers, strings, null, non-null values, and non-iterables, respectively.
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>empty</div>
                                        </td>
                                        <td>
                                            <div>Produces no output.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>$__loc__</div>
                                        </td>
                                        <td>
                                            <div>Produces an object with a “file” key and a “line” key</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>add</div>
                                        </td>
                                        <td>
                                            <div>Produces the summed elements of the input array</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>any, any( <em>foo</em> )</div>
                                        </td>
                                        <td>
                                            <div>Produces <strong>true</strong> if any of the elements of the input array (resp <em>foo</em>) is
                                                <strong>true</strong></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>all, all( <em>foo</em> )</div>
                                        </td>
                                        <td>
                                            <div>Produces <strong>true</strong> if all of the elements of the input array (resp <em>foo</em>) is
                                                <strong>true</strong></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>range( [<em>from</em> ;] upto [; <em>by</em>] )</div>
                                        </td>
                                        <td>
                                            <div>Produces a range of numbers (<em>upto</em> is exclusive)</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>floor, sqrt</div>
                                        </td>
                                        <td>
                                            <div>Returns the floor (resp square root) of its numeric input</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>tonumber</div>
                                        </td>
                                        <td>
                                            <div>Converts into to number</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>infinite, nan, isinfinite, isnan, isfinite, isnormal</div>
                                        </td>
                                        <td>
                                            <div>Returns <strong>true</strong> depending of the input</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>sort | sort_by( <em>foo</em> )</div>
                                        </td>
                                        <td>
                                            <div>Sorts the input array (<em>null</em> &lt; <em>false</em> &lt; <em>true</em> &lt; numbers &lt; strings &lt;
                                                arrays &lt; objects)
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>group_by( <em>foo</em> )</div>
                                        </td>
                                        <td>
                                            <div>Groups the elements of the input array having the same <em>foo</em> value into separate arrays (sorted by
                                                <em>foo</em> values)
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>min | max | min_by( <em>foo</em> ) | max_by(<em>foo</em>)</div>
                                        </td>
                                        <td>
                                            <div>Finds the minimum (resp maximum) element of the input array</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>unique, unique_by( <em>foo</em> )</div>
                                        </td>
                                        <td>
                                            <div>Produces an array of unique element of the input array.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>reverse</div>
                                        </td>
                                        <td>
                                            <div>Reverses an array</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>contains( <em>foo</em> )</div>
                                        </td>
                                        <td>
                                            <div>Produces <strong>true</strong> if <em>foo</em> is completely contained within the input.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>indices( <em>foo</em> )</div>
                                        </td>
                                        <td>
                                            <div>Outputs an array containing the indices in . where <em>foo</em> occurs.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>inside( <em>foo</em> )</div>
                                        </td>
                                        <td>
                                            <div>produce true if the input is completely contained within <em>foo</em></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>combinations</div>
                                        </td>
                                        <td>
                                            <div>Production all combinations of an array</div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </td>
                    <td>
                        <section>
                            <h3>String manipulation</h3>
                            <div>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div>tostring</div>
                                        </td>
                                        <td>
                                            <div>JSON-encode input as a string</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>"\(<em>foo</em>)"</div>
                                        </td>
                                        <td>
                                            <div>Interpolates <em>foo</em> inside a string</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>index( <em>foo</em>), rindex( <em>foo</em> )</div>
                                        </td>
                                        <td>
                                            <div>Outputs the index of the first (index) or last (rindex) occurrence of <em>foo</em> in the input.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>startswith( <em>str</em> )</div>
                                        </td>
                                        <td>
                                            <div>Outputs true if . starts with the given string argument.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>endswith( <em>str</em> )</div>
                                        </td>
                                        <td>
                                            <div>Outputs true if . ends with the given string argument.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>ltrimstr( <em>foo</em> ), rtrimstr( <em>foo</em> )</div>
                                        </td>
                                        <td>
                                            <div>Outputs its input with the given prefix (resp. suffix) string removed, if it starts (resp. ends) with it.
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>explode</div>
                                        </td>
                                        <td>
                                            <div>Converts an input string into an array of the string’s codepoint numbers.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>implode</div>
                                        </td>
                                        <td>
                                            <div>The inverse of explode.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>split( <em>foo</em> )</div>
                                        </td>
                                        <td>
                                            <div>Splits an input string on the separator argument.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>join( <em>foo</em> )</div>
                                        </td>
                                        <td>
                                            <div>Joins the array of elements given as input, using the argument as separator.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>ascii_downcase, ascii_upcase</div>
                                        </td>
                                        <td>
                                            <div>Emit a copy of the input string with its alphabetic characters (a-z and A-Z) converted to the specified
                                                case.
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        <section>
                            <h3>Path &amp; object manipulation</h3>
                            <div>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div>path ( <em>x</em> )</div>
                                        </td>
                                        <td>
                                            <div>Output the array representation of <em>x</em> : (keys/ indices, values)</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>getpath( <em>PATHS</em> )</div>
                                        </td>
                                        <td>
                                            <div>Outputs the values in <em>.</em> found at each path in <em>PATHS</em></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>setpath( <em>PATH</em>; <em>VALUE</em> )</div>
                                        </td>
                                        <td>
                                            <div>Set the <em>PATHS</em> in <em>.</em> to <em>VALUE</em></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>delpaths( <em>PATHS</em> )</div>
                                        </td>
                                        <td>
                                            <div>Removes the key at the paths in <em>PATHS</em></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>to_entries</div>
                                        </td>
                                        <td>
                                            <div>Converts from object to an array of "key":"value"</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>from_entries</div>
                                        </td>
                                        <td>
                                            <div>Converts from an array of "key":"value" to an object</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>with_entries( <em>foo</em> )</div>
                                        </td>
                                        <td>
                                            <div>Shortcut for <strong>to_entries | map(<em>foo</em>) | from_entries</strong></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>flatten, flatten( <em>depth</em> )</div>
                                        </td>
                                        <td>
                                            <div>Produces a flat array in which all arrays inside the original array have been recursively replaced by
                                                their values.
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        <section>
                            <h3>Loop control</h3>
                            <div>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div>while(cond; update)</div>
                                        </td>
                                        <td>
                                            <div>repeatedly apply an update to . until cond is false.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>until(cond; next)</div>
                                        </td>
                                        <td>
                                            <div>repeatedly apply the expression next, initially to . then to its own output, until cond is true.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>recurse( <em>foo</em> [ ,<em>cond</em> ] )</div>
                                        </td>
                                        <td>
                                            <div>search through a recursive structure, and extract data from all levels.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>walk( <em>foo</em> )</div>
                                        </td>
                                        <td>
                                            <div>applies <em>foo</em> recursively to every component of the input entity.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>bsearch( <em>foo</em> )</div>
                                        </td>
                                        <td>
                                            <div>conducts a binary search for <em>foo</em> in the input array.</div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        <section>
                            <h3>Regular expressions</h3>
                            <div>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div>test( <em>RE</em> [; <em>FLAGS</em>] )</div>
                                        </td>
                                        <td>
                                            <div>True if input string matches the given RE</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>match( <em>RE</em> [; <em>FLAGS</em>] )</div>
                                        </td>
                                        <td>
                                            <div>outputs an object for each match it finds.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>capture( <em>RE</em> [; <em>FLAGS</em>] )</div>
                                        </td>
                                        <td>
                                            <div>Collects the named captures in a JSON object, with the name of each capture as the key, and the matched
                                                string as the corresponding value.
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>scan( <em>RE</em> [; <em>FLAGS</em>] )</div>
                                        </td>
                                        <td>
                                            <div>Emit a stream of the non-overlapping substrings of the input that match the regex in accordance
                                                with the flags, if any have been specified.
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>split|splits( <em>RE</em> [; <em>FLAGS</em>] ), splits()</div>
                                        </td>
                                        <td>
                                            <div>Splits an input string, and provides an array (resp. stream)</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>sub|gsub( <em>RE</em> ; <em>tostring</em> [; <em>FLAGS</em>])</div>
                                        </td>
                                        <td>
                                            <div>Emit the string obtained by replacing the first (resp. all) match of regex in the input string with tostring,
                                                after interpolation.
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div>
                                    <div style="padding: 0 8px;"><b class="primary--text">FLAGS is any of "g, i, m, s, p, n, l, x"</b></div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <h3> Operators</h3>
                            <div>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td colspan="2">
                                            <div>INDEX</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <div>JOIN</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <div>IN</div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'JqCheatSheet'
    })
</script>

<style lang="scss">
    .jq-cheat-sheet { height: 100%; display: block; padding: 16px 0; font-size: 13px;
        .cheat-sheet-container { height: 100%; overflow: auto; display: block;
            > table {table-layout: fixed; width: 100%; color: #666;
                > tbody > tr > td {width: 50%; padding: 16px; vertical-align: top;}
            }
            section {
                h3 {color: #fff;font-size: 14px; display: block;padding: 8px;background: #333; margin: 0 0 10px;}
                table {table-layout: fixed; width: 100%;}
                td {padding: 8px; vertical-align: top;}
                td:first-child {width: 35%; color: #0D47A1; }
                tr:nth-child(2n+1) td {background: #eff4f9;}
                + section {margin-top: 30px;}
            }
        }
    }
</style>
