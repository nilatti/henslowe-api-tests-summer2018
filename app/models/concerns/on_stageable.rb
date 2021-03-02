module OnStageable
extend ActiveSupport::Concern
    def find_on_stages
        on_stages_with_characters = self.on_stages.select { |os| !os.character.nil?}
        on_stages_with_characters.uniq! {|c| c.character_id }
        on_stages_with_character_groups = self.on_stages.select { |os| !os.character_group.nil?}
        on_stages_with_character_groups.uniq! {|c| c.character_group_id }
        return on_stages_with_characters.concat(on_stages_with_character_groups)
    end
end