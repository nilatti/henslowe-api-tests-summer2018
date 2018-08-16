require 'test_helper'

class ActsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @act = acts(:one)
  end

  test "should get index" do
    get acts_url, as: :json
    assert_response :success
  end

  test "should create act" do
    assert_difference('Act.count') do
      post acts_url, params: { act: { act_number: @act.act_number, end_page: @act.end_page, play_id: @act.play_id, start_page: @act.start_page, summary: @act.summary } }, as: :json
    end

    assert_response 201
  end

  test "should show act" do
    get act_url(@act), as: :json
    assert_response :success
  end

  test "should update act" do
    patch act_url(@act), params: { act: { act_number: @act.act_number, end_page: @act.end_page, play_id: @act.play_id, start_page: @act.start_page, summary: @act.summary } }, as: :json
    assert_response 200
  end

  test "should destroy act" do
    assert_difference('Act.count', -1) do
      delete act_url(@act), as: :json
    end

    assert_response 204
  end
end
