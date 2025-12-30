module.exports = grammar({
  name: 'todo',
  extras: $ => [/\r/],
  rules: {
    document: $ => repeat(choice(
      $.project,
      $.todo_done,
      $.todo_cancelled,
      $.todo_pending,
      $.note,
      $.empty_line
    )),

    // Project: text ending with colon (highest priority)
    project: $ => prec(2, seq(
      optional($._indent),
      $.project_name,
      ':',
      optional(seq(/[ \t]+/, $.tags)),
      optional(/[ \t]+/),
      $._eol
    )),
    project_name: $ => /[^ \t\n\r☐✔✘:][^\n\r:]*/,

    // Pending todo - use higher precedence than note
    todo_pending: $ => prec(1, seq(
      optional($._indent),
      $.pending_symbol,
      /[ \t]+/,
      $.task_content,
      $._eol
    )),

    // Done todo
    todo_done: $ => prec(1, seq(
      optional($._indent),
      $.done_symbol,
      /[ \t]+/,
      $.task_content,
      $._eol
    )),

    // Cancelled todo
    todo_cancelled: $ => prec(1, seq(
      optional($._indent),
      $.cancelled_symbol,
      /[ \t]+/,
      $.task_content,
      $._eol
    )),

    // Task symbols as explicit tokens
    pending_symbol: $ => '☐',
    done_symbol: $ => '✔',
    cancelled_symbol: $ => '✘',

    // Task content: alternating text and tags
    task_content: $ => prec.left(repeat1(choice(
      $.tag,
      $.text
    ))),

    // Tags: @name or @name(value)
    tag: $ => prec(2, seq(
      '@',
      $.tag_name,
      optional($.tag_value_group)
    )),
    tag_name: $ => /[a-zA-Z][a-zA-Z0-9_-]*/,
    tag_value_group: $ => seq('(', $.tag_value, ')'),
    tag_value: $ => /[^)\n\r]+/,
    tags: $ => repeat1($.tag),

    // Text: anything that's not a tag start or newline
    text: $ => /[^\n\r@]+/,

    // Note: line without task symbol or project colon (lowest priority)
    note: $ => prec(-1, seq(
      optional($._indent),
      $.note_text,
      $._eol
    )),
    note_text: $ => token(prec(-1, /[^☐✔✘\n\r][^\n\r]*/)),

    // Helpers
    _indent: $ => /[ \t]+/,
    _eol: $ => /\n/,
    empty_line: $ => /\n/,
  }
});
