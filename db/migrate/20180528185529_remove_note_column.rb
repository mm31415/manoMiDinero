class RemoveNoteColumn < ActiveRecord::Migration[5.1]
  def change
    remove_column :bills, :note
  end
end
