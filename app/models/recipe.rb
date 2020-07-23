class Recipe < ApplicationRecord
  searchkick text_middle: [:title], word: [:instructions],
             searchable: [:title, :instructions],
             suggest: [:title],
             filterable: [:title, :instructions]

  def search_data
    {
      title: title,
      instructions: instructions,
      total_time: total_time
    }
  end
end
